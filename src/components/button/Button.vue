<template>
<button 
  :class="type" 
  :disabled="disabled"
  :style="{'width': width + 'px', 'height': height + 'px', 'font-size': fontSize + 'px'}">
  <slot>button</slot>
</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      required: false,
      default: 120
    },
    height: {
      required: false,
      default: 40
    },
    fontSize: {
      required: false,
      default: 13
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  outline: none;
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 3px;
}

.primary {
  color: #fff;
  background: rgb(46, 104, 234);
  &:hover {
    background: rgba(46, 104, 234, 0.8);
  }
}

.cancel {
  color: #999;
  border: 1px solid #cccccc;
  &:hover {
    color: rgba(46, 104, 234, 0.8);
    border: 1px solid rgba(46, 104, 234, 0.8);
  }
}

button:disabled {
  border: none;
  background: #f4f4f4;
  color: #cccccc;
  cursor: no-drop;
  &:hover {
    background: #f4f4f4;
  }
}
</style>
