<template>
    <div class="search-suggestion">

        <!--绑定自定义事件，传给父级数据 @click="$emit('search',item)" -->
        <van-cell
            v-for="item,index in suggestion"
            :key='index'
            icon="search"
            @click="$emit('search',item)"
        >
            <div
                slot="title"
                v-html="hightLight(item)"
            ></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
    name: "SearchSuggestion",
    data() {
        return {
            suggestion: [],
        };
    },
    props: {
        searchText: {
            type: String,
            required: true,
        },
    },
    watch: {
        // 监视由父级传过来的searchText的变化
        searchText: {
            // 防抖
            handler: debounce(function (value) {
                this.loadSearchSuggestions(value);
            }, 100),
            // handler(value) {
            //      this.loadSearchSuggestions(value);
            // },
            // 立即执行
            immediate: true,
        },
    },
    methods: {
        async loadSearchSuggestions(q) {
            try {
                const { data } = await getSearchSuggestions(q);
                this.suggestion = data.data.options;
            } catch (error) {
                this.$toast("数据获取失败,请稍后再试");
            }
        },
        hightLight(text) {
            const heightlightStr = `<span class="active">${this.searchText}</span>`;
            // 如果要正则要传入变量，则要手动new 一个
            const reg = new RegExp(this.searchText, "gi");
            try {
                return text.replace(reg, heightlightStr); //???
            } catch (error) {}
        },
    },
};
</script>

<style lang="less" scoped>
.search-suggestion {
    /deep/ .active {
        color: #e51400;
    }
}
</style>