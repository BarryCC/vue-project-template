<template>
  <div>
    <quill-editor :content="value"
                  ref="myTextEditor"
                  :options="editorOption"
                  @change="$emit('on-change', $event.html)"
    ></quill-editor>
    <Upload
        ref="upload"
        :data="uploadData"
				:action="uploadUrl"
        :show-upload-list="false"
				:max-size="maxSize * 1024"
				:on-exceeded-size="errorSize"
        :before-upload="uploadBefore"
        :on-success="uploadSuccess">
        <div id="upload_file_btn"></div>
    </Upload>
  </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']
  ];
  export default {
		name: 'editor',
		model: {
			prop: 'value',
			event: 'on-change'
		},
    props: {
      value: {
        type: String
      },
      uploadUrl: {
				type: String,
				required: true
			},
			serverPath: {
				type: String
			},
			maxSize: {
				type: Number
			}
		},
		components: {
      quillEditor
    },
    data() {
      return {
        editorOption: {
          placeholder: '',
          theme: 'snow',
          modules: {
            toolbar: {
              container: toolbarOptions,
              handlers: {
                'image': value => {
                  if (value) {
                    this.imgClick();
                  } else {
                    this.quill.format('image', false);
                  }
                },
                'video': value => {
                  if (value) {
                    this.videoClick();
                  } else {
                    this.quill.format('video', false);
                  }
                }
              }
            }
          }
				},
				//上传类型
				uploadType: 'image',
				//上传所需参数
        uploadData: {}
      }
		},
		computed: {
      editor() {
        return this.$refs.myTextEditor.quill;
      }
    },
    methods: {
      imgClick() {
        let upload = document.getElementById('upload_file_btn');
        upload.click();
        this.uploadType = "image";
      },
      videoClick() {
        let upload = document.getElementById('upload_file_btn');
        upload.click();
        this.uploadType = "video";
			},
			errorSize() {
				console.error('文件大小不能超过' + this.size + 'M，请重新上传!');
			},
      uploadBefore(e) {},
      uploadSuccess(res) {
        if(this.uploadType == "image") {
          this.editor.insertEmbed(this.editor.getSelection().index, 'image', this.serverPath + res.data);
        } else {
          this.editor.insertEmbed(this.editor.getSelection().index, 'video', this.serverPath + res.data);
        }
      }
    }
  }
</script>
