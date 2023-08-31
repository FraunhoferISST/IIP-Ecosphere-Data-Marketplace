import {useFetch} from "~/composables/useFetch";
import {KnownNode} from "~/types";


const knownNodes = ref<KnownNode[]>([])
export const useKnownNodes = () => {
    const {fetch} = useFetch();
    const load = () => fetch("/api/knownShops", {
        method: "POST",
        body: {}
    }).then((response) => {
        knownNodes.value = response ?? []
    })

    return {
        knownNodes: computed(() => knownNodes.value),
        load,
    }

}
