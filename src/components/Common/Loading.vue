<template lang="html">
  <div class="loading">
    <div class="mult2rect mult2rect1"></div>
    <div class="mult2rect mult2rect2"></div>
    <div class="mult2rect mult2rect3"></div>
    <div class="mult2rect mult2rect4"></div>
    <div class="mult2rect mult2rect5"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .mult2rect {
     height: 30px;
     width: 7px;
     margin: 0 2px;
  }

  .mult2rect1 {
     background-color: #15dbff;
     -webkit-animation: mult2rect1 3s infinite linear;
     animation: mult2rect1 3s infinite linear;
  }

  @-webkit-keyframes mult2rect1 {
     0%, 10%, 70%, 80%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     5%, 75% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  @keyframes mult2rect1 {
     0%, 10%, 70%, 80%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     5%, 75% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  .mult2rect2 {
     background-color: #10caf8;
     -webkit-animation: mult2rect2 3s infinite linear;
     animation: mult2rect2 3s infinite linear;
  }

  @-webkit-keyframes mult2rect2 {
     0%, 5%, 15%,  65%, 75%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     10%, 70% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  @keyframes mult2rect2 {
     0%, 5%, 15%,  65%, 75%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     10%, 70% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  .mult2rect3 {
     background-color: #0ab1ee;
     -webkit-animation: mult2rect3 3s infinite linear;
     animation: mult2rect3 3s infinite linear;
  }

  @-webkit-keyframes mult2rect3 {
     0%, 10%, 20%, 60%, 70%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     15%, 65% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  @keyframes mult2rect3 {
     0%, 10%, 20%, 60%, 70%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     15%, 65% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  .mult2rect4 {
     background-color: #0598e3;
     -webkit-animation: mult2rect4 3s infinite linear;
     animation: mult2rect4 3s infinite linear;
  }

  @-webkit-keyframes mult2rect4 {
     0%, 15%, 25%, 55%, 65%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     20%, 60% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  @keyframes mult2rect4 {
     0%, 15%, 25%, 55%, 65%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     20%, 60% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  .mult2rect5 {
     background-color: #0087dc;
     -webkit-animation: mult2rect5 3s infinite linear;
     animation: mult2rect5 3s infinite linear;
  }

  @-webkit-keyframes mult2rect5 {
     0%, 20%, 30%, 50%, 60%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     25%, 55% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }

  @keyframes mult2rect5 {
     0%, 20%, 30%, 50%, 60%, 100% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
     }
     25%, 55% {
        -webkit-transform: scaleY(2);
        transform: scaleY(2);
     }
  }
}
</style>
