
<template>
  <div class="scanCode-container">
    <div v-if="devices.length>0" class="changeCurrentDeviceId">      
    <select v-model="currentDeviceId" @change="restart">
      <option
          v-for="device in devices"
          :key="device.deviceId"
          :value="device.deviceId"
        >
          {{ device.label }}
        </option>
    </select>
    </div>
    <video id="video" class="video"></video>
  </div>
</template>
<script>
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";
export default {
  name: "QRCode",
  components: {},
  data: function () {
    return {
      isShow:false,
      codeReader: new BrowserMultiFormatReader(),
      currentDeviceId: null,
      devices: [],
    };
  },
  mounted: function () {
    this.inIt();
  },
  methods: {
    decodeOnce: function (codeReader, deviceId) {
      codeReader
        .decodeFromInputVideoDevice(deviceId, "video")
        .then((result) => {
          if (result.text) {
            sessionStorage.setItem("QRCodeResult", result.text);
            codeReader.reset();
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    decodeContinuously: function (codeReader, deviceId) {
      codeReader.decodeFromInputVideoDeviceContinuously(
        deviceId,
        "video",
        (result, err) => {
          if (result) {
            if (result.text) {
              sessionStorage.setItem("QRCodeResult", result.text);
              codeReader.reset();
              this.$router.go(-1);
            }
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
              console.log("No QR code found.");
            }

            if (err instanceof ChecksumException) {
              console.log(
                "A code was found, but it's read value was not valid."
              );
            }

            if (err instanceof FormatException) {
              console.log("A code was found, but it was in a invalid format.");
            }
          }
        }
      );
    },
    inIt: function () {
      this.codeReader
        .getVideoInputDevices()
        .then((videoInputDevices) => {
          if (videoInputDevices.length >= 1) {
            let devices = [];
            videoInputDevices.forEach((device) => {
              devices.push({
                label: device.label,
                deviceId: device.deviceId,
              });
            });
            this.devices = devices;
            console.log(this.devices);
            if(this.devices.length>1){
              this.currentDeviceId = devices[1].deviceId;
              devices[1].label='后置摄像头'
            }else{
              this.currentDeviceId = devices[0].deviceId;
              devices[0].label='前置摄像头'
            }            
            this.restart();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    restart: function () {

      this.codeReader.reset();
      let _this = this;
      setTimeout(function () {
        _this.decodeOnce(_this.codeReader, _this.currentDeviceId);
      }, 500);
    }
  },
  destroyed() {
    this.codeReader.reset();
  }
};
</script>
<style lang="less" scoped>
.scanCode-container {
  width: 100vw;
  height: 100vh;
  background: #000;
  .changeCurrentDeviceId{
    padding: .3125rem;
    select{
      height: 2.5rem;
      padding: .3125rem;
      text-align: center;
      border-radius: .3125rem;
      width: 100%;
      display: flex;
      align-items: center;
      appearance: none;
      outline: none;
      color: #19be6b;
      background: #000;
      border: .0625rem solid #19be6b;
    }
  }
  .video {
    width: 18.75rem;
    height: 18.75rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>