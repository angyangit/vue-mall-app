<template>
    <div class='search-page'>
        <search-bar pageType='cate'></search-bar>
        <scroll-view class='search-scroll'>
            <div class='search-wrapper'>
                <div class='search-key-group'>
                    <section class='tag-warper'>
                        <h2 class='tag-lable'>
                            热门搜索
                        </h2>
                        <tag-container
                                :showRow='2'
                                :tagList='hotKey'
                                @toggleHeight='toggleHeight'
                                @selectTag='selectTag'/>
                    </section>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    import SearchBar from '../../components/SearchBar';
    import ScrollView from '../../components/ScrollView';
    import TagContainer from '../../components/TagContainer';

    export default {
        components: {
            SearchBar,
            ScrollView,
            TagContainer
        },
        data() {
            return {
                hotKey: ['等接口', '等接口', '等接ds口', '等接口', '口',
                    '等接口', '等接口', '等接ds口', '等接口', '等接口', '等接口',
                    '等接口', '等接ds口', '等接口',]
            }
        },
        methods: {
            toggleHeight() {
                console.log('toggleHeight')
                setTimeout(() => {
                    this.$refs.scrollView.refresh()
                }, 500)
            },
            selectTag(item) {
                // this.$refs.searchView.setQueryKey(item.k)
                // this.searchKey = item.k
            },
        }
    }
</script>

<style scoped lang='scss'>
    .search-page {
        .search-scroll {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: 50px;
            .search-wrapper {
                background-color: white;
                bottom: 50px;
            }
        }
    }
</style>
