<template>
    <div class="app">
        <n-message-provider>
            <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN" style="height: 100%">

                <router-view></router-view>

            </n-config-provider>
        </n-message-provider>
    </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import {
    NMessageProvider,
    NConfigProvider,
    zhCN, 
    dateZhCN
} from "naive-ui";
import { defineComponent } from "vue";
import { isEmpty } from "./utils/common";
import { routerList, routerConfig } from "./router";
import { useStore } from "vuex";

export default defineComponent({
    name: "App",
    components: {
        NMessageProvider,
        NConfigProvider,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        router.beforeEach((to, from, next) => {
            if (isEmpty(to.name)) {
                next({ name: "global404" });
            } else {
                let isMatch: boolean = false;
                const matchFuc = (routerList: Array<routerConfig>) => {
                    for (let i = 0; i < routerList.length; i++) {
                        if (isEmpty(routerList[i].children)) {
                            if (routerList[i].name === to.name) {
                                isMatch = true;
                            }
                        } else {
                            matchFuc(
                                routerList[i].children as Array<routerConfig>
                            );
                        }
                    }
                };
                matchFuc(routerList);
                if (isMatch) {
                    next();
                } else {
                    next({ name: "global404" });
                }
            }
        });

        const themeOverrides = {
            common: {
                primaryColor: "#409eff",
                primaryColorHover: "#409eff",
                primaryColorPressed: "#409eff",
                primaryColorSuppl: "#409eff",
            },
        };

        return {
            themeOverrides,
            zhCN, 
            dateZhCN
        };
    },
});
</script>

<style lang="scss" scoped>
.app {
    height: 100%;
}
</style>
