Raspberry pi temperature sensor that submits to Drupal
==
[![Build Status](https://travis-ci.org/eiriksm/raspberry-temp-to-drupal.svg?branch=master)](https://travis-ci.org/eiriksm/raspberry-temp-to-drupal)
[![Coverage Status](https://coveralls.io/repos/eiriksm/raspberry-temp-to-drupal/badge.svg?branch=master)](https://coveralls.io/r/eiriksm/raspberry-temp-to-drupal?branch=master)
[![Code Climate](https://codeclimate.com/github/eiriksm/raspberry-temp-to-drupal/badges/gpa.svg)](https://codeclimate.com/github/eiriksm/raspberry-temp-to-drupal)
[![Dependency Status](https://david-dm.org/eiriksm/raspberry-temp-to-drupal.svg)](https://david-dm.org/eiriksm/raspberry-temp-to-drupal)

This module is an "attachment" to the blog post about the subject Drupal and IoT, found at [https://orkjern.com/drupal-iot-code-part-2](https://orkjern.com/drupal-iot-code-part-2).

## Requirements

To use this example code you need to have a ds18b20 temperature sensor, and preferrably an OS that supports the hardware modules we need to use. I use raspbian, and therefore these are the commands needed:

```
sudo modprobe wire
sudo modprobe w1-gpio
sudo modprobe w1-therm
```

If you have no idea what any of these things mean you can probably find better results by googling it than reading here. [Here is on article on the subject, which also includes the needed wiring](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-11-ds18b20-temperature-sensing/hardware).

The code uses nodejs to sense the temperature and also send the data, so you would also need that. I am pretty sure some googling will reveal good guides on that too.

## Usage

- Start by renaming the default config file to config.json. (`cp default.config.json config.json`)
- Then edit the `config.json` file to suit your needs. Specifically the API key, sensor and URLs.
- The interval specified in the config file is in minutes. So set to `1` if you want updates per minute.
- You can use the starter script included in this repo to start monitoring. To start it, run `node starter.js`

## Licence
WTFPL
