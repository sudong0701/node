<template>
    <el-button :type="type" :size="mediaSizeMap[mediaSize]" :icon="icon" :circle="circle">
        <slot></slot>
    </el-button>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, PropType } from "vue";
import { useStore } from "vuex";
import { buttonType } from './data.d'

export default defineComponent({
    name: "mlButton",
    props: {
        type: {
            type: String as PropType<buttonType>,
            default: 'primary',
        },
        size: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        circle: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const store = useStore();
        const mediaSize: ComputedRef<string> = computed(
            () => store.getters.mediaSize
        );

        const mediaSizeMap =  {
            "small": "mini",
            "medium": "small",
            "large": "medium",
        }

        return {
            mediaSize,
			mediaSizeMap
        };
    },
});
</script>

