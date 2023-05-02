import { defineStore } from "pinia";

interface ISearchState {
  /** 历史搜索列表 */
  searchHistoryTag: any[];
  /** 当前搜索关键词 */
  searchWord: string;
}

export const useSearchStore = defineStore({
  id: "search",

  state: (): ISearchState => ({
    searchHistoryTag: JSON.parse(JSON.stringify([])),
    searchWord: "",
  }),

  getters: {
    currentSearchHistoryTagData: (state: any) => state.searchHistoryTag,
    currentSearchWord: (state) => state.searchWord,
  },

  actions: {
    async getcurrentSearchHistoryTag() {
      if (window.localStorage.searchHistory) {
        this.searchHistoryTag = JSON.parse(window.localStorage.searchHistory);
      }
    },

    setcurrentSearchHistoryTag(keyword: string) {
      if (!this.searchHistoryTag.includes(keyword)) {
        this.searchHistoryTag.push(keyword);
        if (window.localStorage.searchHistory) {
          localStorage.searchHistory = JSON.stringify(this.searchHistoryTag);
        } else {
          window.localStorage.setItem(
            "searchHistory",
            JSON.stringify(this.searchHistoryTag)
          );
        }
      }
    },

    setcurrentSearchword(keyword: string) {
      this.searchWord = keyword;
    },

    clearSearchHistoryTag() {
      this.searchHistoryTag = [];
      window.localStorage.setItem("searchHistory", JSON.stringify([]));
    },
  },
});
