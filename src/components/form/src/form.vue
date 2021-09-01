<template>
    <n-form ref="formRef" :disabled="disabled" :inline="inline" :rules="rules" :size="mediaSize" :labelWidth="labelWidth" :label-align="labelAlign" :labelPlacement="labelPlacement" :showRequireMark="showRequireMark" :showFeedback="showFeedback">
        <slot></slot>
    </n-form>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ComputedRef, ref } from "vue";
import { NForm, FormRules } from "naive-ui";
import { Size, LabelAlign, LabelPlacement, ShowRequireMark } from "./data.d";
import { useStore } from "vuex";

export default defineComponent({
	name: 'mlForm',
    components: {
        NForm
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        inline: {
            type: Boolean,
            default: true,
        },
        rules: {
            type: Object as PropType<FormRules>,
            default: [],
        },
        labelWidth: {
            type: [Number, String],
            default: "",
        },
        labelAlign: {
            type: String as PropType<LabelAlign>,
            default: "left",
        },
        labelPlacement: {
            type: String as PropType<LabelPlacement>,
            default: "left",
        },
        showRequireMark: {
            type: [String, Boolean] as PropType<ShowRequireMark>,
            default: false,
        },
		showFeedback: {
			type: Boolean,
			default: true
		}
    },
    emits: [],
    setup(props, { emit }) {
        const store = useStore();
        const mediaSize: ComputedRef<Size> = computed(
            () => store.getters.mediaSize
        );
        const computedProps = computed(() => ({ ...props }));

		const formRef = ref<any>(null)
        //TODO Size 需要重新定义
        return {
            computedProps,
            mediaSize,
			formRef,
        };
    },
});
</script>
