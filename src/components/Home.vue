<template>
<div>
    <div class="section1">
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <div class="itemCard">
            <img class="itemImg" src="../assets/img/burger.jpg" alt="">
            <div class="itemFooter">
                <h5>Add to cart</h5>
                <img class="heart" src="../assets/img/heart-white.svg" alt="" height="24px" width="24px">
            </div>
        </div>
        <h1>Cafemoto</h1>
        <!-- <button class="half-out-button"> Half out! </button> -->
    </div>

    <div class="itemList">
        <div class="item">
            <h2>Burger</h2>
            <h3>Veg ></h3>
            <h3>Non - Veg ></h3>
        </div>
        <div class="item">
            <h2>Sandwich</h2>
            <h3>Veg ></h3>
            <h3>Non - Veg ></h3>
        </div>
        <div class="item">
            <h2>Burger</h2>
            <h3>Veg ></h3>
            <h3>Non - Veg ></h3>
        </div>

    </div>
</div>
</template>

<script>
import FoodItem from '../models/FoodItem';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Hello World'
    };
  },
  mounted() {
    var item = new FoodItem();
    item.getItems(window.firebase.firestore).then(data => console.log(data));
  }
};
</script>

<style scoped>
.section1 {
  /* position: relative; */
  width: auto;
  height: 380px;
  background-color: #ff8f00;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 60px;
}

.itemCard {
  display: inline-block;
  height: 210px;
  width: 150px;
  margin: 50px 20px;
  background-color: #f5f5f5;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.itemCard:hover {
  box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
  transition: ease-in-out;
}

.itemImg {
  width: 100%;
  height: 160px;
  object-position: center;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.itemCard h5 {
  margin: 0;
  padding-right: 10px;
  padding-top: 3px;
  text-align: left;
}

.itemFooter {
  display: flex;
  width: 100%;
  padding-top: 10px;
  justify-content: center;
}

.section1 h1 {
  margin: 0;
  text-align: left;
  opacity: 0.7;
}

.section1::-webkit-scrollbar-thumb:hover {
  background: #fff3e0;
}

.section1::-webkit-scrollbar-thumb:active {
  background: linear-gradient(left, #babdbe, #babdbe);
}

.section1::-webkit-scrollbar {
  height: 8px;
  background-color: #f5f5f5;
}

.heart:active {
  background-image: url(../assets/img/heart-red.svg);
}

.half-out-button {
  position: absolute;
  bottom: 0;
  right: 5%;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin-bottom: -35px;
  background-color: #f5f5f5;
}

.itemList {
  text-align: left;
  padding-left: 30px;
  padding-bottom: 40px;
}

.item {
  margin-bottom: 8px;
}

.item h2 {
  font-weight: bolder;
  opacity: 0.85;
  margin-bottom: 10px;
}

.item h3 {
  font-weight: bold;
  opacity: 0.6;
  margin: 0;
  margin-bottom: 8px;
}
</style>
