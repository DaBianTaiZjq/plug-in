
<template>
  <div>
    <video id="video" class="video"></video>
    <div v-if="devices.length">
      <label>Change video source:</label>
      <select v-bind:change="changeDevice">
        <option
          v-for="device in devices"
          v-bind:key="device.deviceId"
          value="device.deviceId"
        >
          {{ device.label }}
        </option>
      </select>
    </div>
    <div>{{ result }}</div>
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
      codeReader: new BrowserMultiFormatReader(),
      devices: [],
      currentDevice: {},
      result: null,
    };
  },
  created: function () {
    this.decode();
  },
  methods: {
    decodeOnce: function (codeReader, deviceId) {
      codeReader
        .decodeFromInputVideoDevice(deviceId, "video")
        .then((result) => {
          this.result = result.text;
        })
        .catch((err) => {
          this.result = err;
        });
    },
    decodeContinuously: function (codeReader, deviceId) {
      codeReader.decodeFromInputVideoDeviceContinuously(
        deviceId,
        "video",
        (result, err) => {
          if (result) {
            this.result = result.text;
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
              this.result = "No QR code found.";
            }

            if (err instanceof ChecksumException) {
              this.result =
                "A code was found, but it's read value was not valid.";
            }

            if (err instanceof FormatException) {
              this.result = "A code was found, but it was in a invalid format.";
            }
          }
        }
      );
    },
    decode: function () {
      this.result = "ZXing code reader initialized";
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
            this.currentDevice = this.devices[0];
            this.decodeOnce(this.codeReader, this.currentDevice.deviceId);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changeDevice: function (index) {
      this.currentDevice = this.devices[index];
    },
  },
};
</script>
<style scoped>
.video {
  width: 300px;
  height: 300px;
}
</style>