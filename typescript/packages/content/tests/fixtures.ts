import { defineComponent, h } from "vue";

import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

import type { EditorToolset } from "@ox-watt/content/src/types/editor";


/**
 * Minimal TipTap extension used in tests.
 */
export const TestExtension = Extension.create({
    name: "testExtension",
});

/**
 * Reusable toolset fixture.
 */
export const TestToolset: EditorToolset = {
    name: "test",
    extensions: [TestExtension],
};

/**
 * Minimal TipTap extension used to test extension deduplication.
 */
export const AnotherTestExtension = Extension.create({
    name: "anotherTestExtension",
});

/**
 * Reusable editor options for tests.
 */
export const TestEditorOptions = {
    extensions: [],
};

/**
 * Create a minimal Vue component.
 *
 * @returns A component rendering an empty div.
 */
export function createTestComponent() {
    return defineComponent({
        setup() {
            return () => h("div");
        },
    });
}
