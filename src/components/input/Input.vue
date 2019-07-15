<template>
	<input 
    @input="$emit('on-change', $event.target.value)"
    @blur="$emit('on-blur', $event.target.value)"
    :value="value"
    :type="type" 
    :disabled="disabled"
    :style="{'width': width + 'px', 'height': height + 'px', 'font-size': fontSize + 'px'}"
    :placeholder="placeholder"
  >
</template>

<script>
export default {
	name: 'Input',
	model: {
    prop: 'value',
    event: 'on-change'
  },
	props: {
    value:{
      type: String,
    },
    type: {
      type: String,
      required: false,
      default: 'text'
		},
		placeholder: {
      type: String,
      required: false,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      required: false,
      default: 220
    },
    height: {
      required: false,
      default: 36
    },
    fontSize: {
      required: false,
      default: 14
    }
  }
}
</script>

<style lang="scss" scoped>
input {
	border: 1px solid #ccc;
	border-radius: 5px;
	padding-left: 5px;
  box-sizing: border-box;
}
input:hover {
	border: 1px solid #78a2ff;
}
input:disabled {
  cursor: no-drop;
  border: 1px solid #e5e5e5;
}
</style>