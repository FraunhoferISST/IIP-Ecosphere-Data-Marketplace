import {useLocalStorage} from '@vueuse/core'
import {FetchOptions} from "ofetch";

const userStore = useLocalStorage("broker-user", {})

export const useFetch = () => {
    const authHeader = computed(() => ({
        ...(userStore.value.accessToken ? {
            'Authorization': `Bearer ${userStore.value.accessToken}`
        } : {})
    }))

    return {
        fetch: (path: string, opts: FetchOptions = {}) => $fetch(path, {
            ...opts,
            headers : {
                ...authHeader.value,
                ...opts.headers,
            },
        })
    }

}
