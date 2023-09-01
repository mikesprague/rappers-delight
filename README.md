# rappers-delight

Play Sugar Hill Gang's song Rapper's Delight while running another command

Adapted from: https://github.com/mafintosh/benny-hill

## Usage

NOTE: currently NOT published to npm or GH Packages

```shell
git clone https://github.com/mikesprague/rappers-delight
cd rappers-delight
npm install -g .

rappers-delight # just play benny hill
rappers-delight sleep 10 # play for 10 s
rappers-delight make # when compiling
rappers-delight npm install -g dat # installing node modules
```

NOTE: optionally run `npm install` to install dev dependencies if desired

### Linux users

Make sure to install the following dependencies first if you are on linux

```shell
sudo apt-get install sox libsox-fmt-mp3
```

Alternatively you can install mplayer and it'll just use that

## License

MIT License
