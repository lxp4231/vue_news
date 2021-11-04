<template>
    <div class="qa-container">
        <!-- 导航栏 -->
        <van-nav-bar
            title="视频"
            left-arrow
            @click-left="$router.back()"
            class="nav"
        />
        <!-- 内容 -->
        <div class="content">
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >谈一谈格力的手机业务？</div>
                <div slot="label">
                    <!-- 视频 -->
                    <video
                        slot="default"
                        class="right-cover"
                        fit="cover"
                        controls
                        src="https://video19.ifeng.com/video09/2021/05/26/p6803231351488126976-102-8-161249.mp4?reqtype=tsl&vid=2c791e3b-444e-4578-83e3-f4808228ae3b&uid=0puFR4&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1622096387396&gid=6a4poXmsep1E&sign=39f76885daca6503ebf90acbfffc1ff1&tm=1622096387396&vkey=hNNYOc%2F7szMAWUiRIyPWRQfr8Ht5lykAURmV1c1sgYyZUYZ8%2F33s3xH5RrqriSZm3d%2FeG3cbkaDxifCHRhN9VVV4%2F4k%2Bz9yjYZJYruTpzTWP4%2Busb5oRKwVxB%2FfMlFfykANgxjbmNWo8TBjsrITCY5gYXu%2BsMNqhyFHB4ps3Xy2gBcUQHJ03s78Gp%2B3X4gi%2BPxzUIvSXVuy9%2FqnkfrEmW9Cz1d0NH0aG4gTmK6dbbsy3tnvCd86UfNOfEAGz37cVuSWzWX%2B%2B4KQRNIQ%2BdB61m23b6oGTVMiYmQP6Jk7bQnA%3D"
                    ></video>
                    <div class="lable-info-wrap">
                        <span>2000次播放</span>
                    </div>
                </div>
            </van-cell>
            <van-cell>
                <div
                    slot="title"
                    class="title van-multi-ellipsis--l2"
                >你用上5G了吗？我国5G手机终端达3.1亿 占全球比例超80％?</div>
                <div slot="label">
                    <!-- 视频 -->
                    <video
                        slot="default"
                        class="right-cover"
                        fit="cover"
                        controls
                        src="https://video19.ifeng.com/video09/2021/05/26/p6803268684325330944-102-8-184104.mp4?reqtype=tsl&vid=ec74b1e4-d1fa-488b-aaf5-71984ca7d13e&uid=1Vun5L&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1622096310639&gid=fg3vsXmseXFv&sign=38e7c790561e1fd1b57e61a1cbd8031c&tm=1622096310639&vkey=hNNYOc%2F7szMAWUiRIyPWRQfr8Ht5lykAURmV1c1sgYyZUYZ8%2F33s3xH5RrqriSZm90x5ccgvMk05quOb6Xie0lCf1ES6GPZxUkpK81lKZyJlzBlLJLB6pXIIidNwGb0tF6oarVq7EroGylO6v54SUNN8Ac3mQJdXnNSVlqEG%2FwAxFjAQyUa%2FXQXD6l8fIt24w8LAx5Rng4Q4xWzonYSK2M3vZonc2BR1ZyWfTMQFd8VWFqt92j95ayhS3zpw7KS4UOdMdjdTGZ3qGqMPd5TI7yW%2BwTFYJYrThnQtzPRCOLU%3D"
                    ></video>
                    <div class="lable-info-wrap">
                        <span>1999次播放</span>
                    </div>
                </div>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: "qa",
};
</script>

<style scoped lang='less'>
.layout-container {
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .content {
        margin-top: 92px;
    }

    .lable-info-wrap span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .right-cover {
        width: 100%;
        border-radius: 0.10667rem;
    }
}
</style>