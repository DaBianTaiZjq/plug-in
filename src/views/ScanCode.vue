
<template>
  <div class="scanCode-container">
    <div class="video-container">
      <video id="video" class="video"></video>
    </div>
    <div class="camera-container" v-if="videoInputDevices.length">
      <label>摄像头：</label>
      <select v-model="currentVideoInputDevice">
        <option
          v-for="(videoInputDevice, index) in videoInputDevices"
          :key="index"
          :value="videoInputDevice"
        >
          {{ videoInputDevice.label }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";
import { MessageBox } from "mint-ui";
export default {
  name: "ScanCode",
  components: {},
  data: function () {
    return {
      codeReader: new BrowserMultiFormatReader(),
      videoInputDevices: [],
      currentVideoInputDevice: {},
      decodeResult: undefined,
      scanMode: "once",
      decodeMode: "once",
    };
  },
  mounted: function () {
    this.openScan();
  },
  methods: {
    async openScan() {
      const _this = this;
      _this.codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices && videoInputDevices.length) {
            _this.videoInputDevices = videoInputDevices;
            _this.currentVideoInputDevice = videoInputDevices[0];
          } else {
            _this.videoInputDevices = [];
            _this.currentVideoInputDevice = {};
          }
        })
        .catch((err) => {
          MessageBox("message", err);
        });
    },

    decodeFromInputVideo() {
      const _this = this;
      _this.codeReader.reset();
      switch (_this.decodeMode) {
        case "once":
          _this.codeReader.decodeFromVideoDevice(
            _this.currentVideoInputDevice.deviceId,
            "video",
            (result, err) => {
              if (result) {
                _this.decodeResult = result;
              }
              if (err) {
                // As long as this error belongs into one of the following categories
                // the code reader is going to continue as excepted. Any other error
                // will stop the decoding loop.
                //
                // Excepted Exceptions:
                //
                //  - NotFoundException
                //  - ChecksumException
                //  - FormatException

                if (err instanceof NotFoundException) {
                  // MessageBox("message", "No QR code found.");
                }

                if (err instanceof ChecksumException) {
                  MessageBox(
                    "message",
                    "A code was found, but it's read value was not valid."
                  );
                }

                if (err instanceof FormatException) {
                  MessageBox(
                    "message",
                    "A code was found, but it was in a invalid format."
                  );
                }
              }
            }
          );
          break;
        case "continuously":
          _this.codeReader.decodeFromVideoDeviceContinuously(
            _this.currentVideoInputDevice.deviceId,
            "video",
            (result, err) => {
              if (result) {
                _this.decodeResult = result;
              }
              if (err) {
                // As long as this error belongs into one of the following categories
                // the code reader is going to continue as excepted. Any other error
                // will stop the decoding loop.
                //
                // Excepted Exceptions:
                //
                //  - NotFoundException
                //  - ChecksumException
                //  - FormatException

                if (err instanceof NotFoundException) {
                  // MessageBox("message", "No QR code found.");
                }

                if (err instanceof ChecksumException) {
                  MessageBox(
                    "message",
                    "A code was found, but it's read value was not valid."
                  );
                }

                if (err instanceof FormatException) {
                  MessageBox(
                    "message",
                    "A code was found, but it was in a invalid format."
                  );
                }
              }
            }
          );
          break;
      }
    },

    successDecode() {
      const _this = this;
      sessionStorage.setItem("QRCodeResult", _this.decodeResult.text);
      _this.$router.go(-1);
    },
  },
  watch: {
    currentVideoInputDevice: function () {
      this.decodeFromInputVideo();
    },
    decodeResult: function () {
      this.successDecode();
    },
  },
  destroyed() {
    this.codeReader.reset();
  },
};
</script>
<style lang="less" scoped>
.scanCode-container {
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  .video-container {
    min-height: 60vh;
    position: relative;
    .video {
      width: 18.75rem;
      height: 18.75rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .camera-container {
    width: 80%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    padding: 2px 0 2px 10px;
    border-radius: 10px;
    border: 1px solid #19be6b;
    select {
      width: calc(100% - 100px);
      color: #19be6b;
      background: #000;
      border: none;
      outline: none;
    }
  }
}
</style>