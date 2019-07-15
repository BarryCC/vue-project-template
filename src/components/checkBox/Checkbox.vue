<template>
	<label class="c-label">
		<input
			class="c-checkbox"
			type="checkbox"
			:value="value"
			:checked="checked"
			:disabled="disabled"
			@change="$emit('on-change', $event.target.checked)"
		>
		<span :class="{'disabled-checkbox-label': disabled}" class="checkbox-label">
			<slot></slot>
		</span>
	</label>
</template>

<script>
export default {
	name: 'Checkbox',
	model: {
    prop: 'checked',
    event: 'on-change'
  },
  props: {
		value: {},
    checked: {
			type: Boolean
		},
		disabled: {
			type: Boolean,
			default: false
		}
  }
}
</script>

<style lang="scss" scoped>
.c-label {
	display: block;
	cursor: pointer;
	margin-right: 15px;
	line-height: 28px;
	.checkbox-label {
    color: #666;
		font-size: 15px;
		margin-left: 3px;
	}
	.disabled-checkbox-label {
		color: #e5e5e5;
		cursor: not-allowed;
	}
}
input[type='checkbox'] {
	position: relative;
  top: 4px;
	width: 18px;
	height: 18px;
	background: #fff;
	-webkit-appearance:none;
	border: 1px solid #ccc;
	border-radius: 2px;
	outline: none;
	transition: background .2s ease-in-out;
}
input[type=checkbox]:checked {
	border-color: #2e68ea;
	background: #2e68ea;
	top: 0;
}
input[type=checkbox]:checked::before {
	content: '\2714';
	display: inline-block;
	width: 17px;
	height: 17px;
	text-align: center;
	line-height: 17px;
	color: #fff;
}
input[type=checkbox]:disabled {
	cursor: not-allowed;
	border: 1px solid #e5e5e5;
}
</style>