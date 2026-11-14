import { describe, expect, it, vi } from 'vitest';

import { useModelEditor } from '@/adm/composables/modelEditor';
import { useArticle, useDb } from '../fixtures';

describe('useModelEditor', () => {
    it('initializes from a source model', () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });

        const editor = useModelEditor(articles, article);

        expect(editor.data).toBeDefined();
        expect(editor.data.title).toBe('Original article');
        expect(editor.isDirty.value).toBe(false);
    });

    it('initializes a new model when the source is null', () => {
        const { articles } = useDb();

        const editor = useModelEditor(articles, null);

        expect(editor.data).toBeInstanceOf(articles.model);
        expect(editor.isDirty.value).toBe(false);
    });

    it('uses model defaults when initializing a new model', () => {
        const { articles } = useDb();
        const defaults = articles.model.getDefaults();

        const editor = useModelEditor(articles, null);

        for (const [field, value] of Object.entries(defaults)) {
            expect(editor.data[field]).toEqual(value);
        }
    });

    it('tracks changes to model fields', () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });

        const editor = useModelEditor(articles, article);

        editor.data.title = 'Updated article';

        expect(editor.isDirty.value).toBe(true);
    });

    it('does not track changes to fields outside the model', () => {
        const { articles } = useDb();
        const article = useArticle();

        const editor = useModelEditor(articles, article);

        (editor.data as Record<string, unknown>).extra = 'value';

        expect(editor.isDirty.value).toBe(false);
    });

    it('resets the model to its original values', () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });

        const editor = useModelEditor(articles, article);

        editor.data.title = 'Updated article';
        editor.reset();

        expect(editor.data.title).toBe('Original article');
        expect(editor.isDirty.value).toBe(false);
    });

    it('replaces the source model', () => {
        const { articles } = useDb();
        const first = useArticle({
            title: 'First article',
        });
        const second = useArticle({
            title: 'Second article',
        });

        const editor = useModelEditor(articles, first);
        const data = editor.data;

        editor.setSource(second);

        expect(editor.data).toBe(data);
        expect(editor.data.title).toBe('Second article');
        expect(editor.isDirty.value).toBe(false);
    });

    it('creates a new model when setting the source to null', () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });

        const editor = useModelEditor(articles, article);

        editor.setSource(null);

        expect(editor.data).toBeInstanceOf(articles.model);
        expect(editor.isDirty.value).toBe(false);
    });

    it('saves changes to the source model by default', async () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });

        const editor = useModelEditor(articles, article);

        editor.data.title = 'Updated article';

        await editor.save();

        expect(article.title).toBe('Updated article');
        expect(editor.isDirty.value).toBe(false);
    });

    it('uses a custom save callback instead of the default save', async () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });
        const save = vi.fn();

        const editor = useModelEditor(articles, article, {
            save,
        });

        editor.data.title = 'Updated article';

        await editor.save();

        expect(save).toHaveBeenCalledOnce();
        expect(article.title).toBe('Original article');
        expect(editor.data.title).toBe('Updated article');
        expect(editor.isDirty.value).toBe(true);
    });

    it('allows a custom save callback to invoke defaultSave', async () => {
        const { articles } = useDb();
        const article = useArticle({
            title: 'Original article',
        });
        const save = vi.fn(async (_data, _source, context) => {
            context.defaultSave();
        });

        const editor = useModelEditor(articles, article, {
            save,
        });

        editor.data.title = 'Updated article';

        await editor.save();

        expect(article.title).toBe('Updated article');
        expect(editor.isDirty.value).toBe(false);
    });

    it('exposes the repository', () => {
        const { articles } = useDb();
        const article = useArticle();

        const editor = useModelEditor(articles, article);

        expect(editor.repository).toBe(articles);
    });
});
