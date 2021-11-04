<template>
    <div class="search-container">
        <form
            action="/"
            class="search-form"
        >
            <van-search
                v-model="searchText"
                show-action
                autofocus='true'
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isResultShow=false"
            />
        </form>
        <!-- 搜索结果 -->
        <SearchResults
            v-if="isResultShow"
            :searchText="searchText"
        />
        <!-- 联想建议 -->
        <SearchSuggestion
            v-else-if="searchText"
            :searchText="searchText"
            @search='onSearch'
        />
        <!-- 搜索历史记录 -->
        <SearchHistory v-else />

    </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import SearchSuggestion from "@/views/search/components/search-suggestion.vue";
import SearchResults from "@/views/search/components/search-results.vue";
export default {
    name: "Search",
    data() {
        return {
            searchText: "",
            isResultShow: false, //控制搜索结果的显示
        };
    },
    components: { SearchHistory, SearchSuggestion, SearchResults },
    methods: {
        onSearch(val) {
            this.isResultShow = true;
            this.searchText = val;
        },
        onCancel() {
            this.$router.back();
        },
    },
};
</script>

<style lang="less" scoped>
.search-container {
    padding-top: 108px;
    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
}
</style>