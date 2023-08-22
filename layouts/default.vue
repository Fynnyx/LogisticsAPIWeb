<template>
    <div class="default-layout">
        <NotificationBox/>
        <header>
            <nav>
                <a href="/">Home</a>
            </nav>
        </header>
        <div class="default-content">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">

    .default-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    header {
        background-color: #333;
        color: #fff;
        padding: 10px;
    }

    nav {
        display: flex;
        justify-content: space-between;

        & > a {
            color: #fff;
            text-decoration: none;
        }
    }

</style>