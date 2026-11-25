
/**
 * Props accepted by {@link OwField}.
 *
 * @template TResult Type of the search result entries.
 */
export interface OwAutocompleteProps<TResult> {
    /** Asynchronous function used to retrieve matching entries. */
    searchItems: (query: string) => Promise<TResult[]>;

    /** Minimum number of characters required to start a search. */
    minSearchLength?: number;

    /** Delay before executing a search after the last input change, in milliseconds. */
    debounce?: number;

    /** Maximum delay before executing a search, in milliseconds. */
    maxWait?: number;

    /** Whether to search the initial search value when the component is mounted. */
    searchOnMount?: boolean;

    /** Current selected value, following the VAutocomplete API. */
    modelValue?: any;

    /** Current search text, following the VAutocomplete API. */
    search?: string | null;

    /** External loading state. */
    loading?: boolean;
}
