import { getCurrentScope, onScopeDispose } from "vue";

/**
 * Registers a resource and automatically unregisters it when its Vue scope is disposed.
 *
 * @param register - Registration callback returning its unregister callback.
 * @param autoDispose - Whether to unregister automatically when the current scope is disposed.
 * @returns The unregister callback.
 */
export function useRegistration(register: () => () => void, autoDispose = true): () => void {
    const cleanup = register();
    let active = true;

    /**
     * Unregisters the resource. Can safely be called multiple times.
     */
    function unregister(): void {
        if (!active) {
            return;
        }

        active = false;
        cleanup();
    }

    if (autoDispose && getCurrentScope()) {
        onScopeDispose(unregister);
    }

    return unregister;
}
