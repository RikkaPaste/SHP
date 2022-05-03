<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "@/views/Home/ListContainer";
import Recommend from "@/views/Home/Recommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";
export default {
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
};
</script>

<style>
</style>