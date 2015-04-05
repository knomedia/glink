# glink
[![Build Status](https://travis-ci.org/knomedia/glink.svg?branch=master)](https://travis-ci.org/knomedia/glink)

create customizable links to your graphite targets.


## Why

Creating links to view graphite visualizations isn't difficult, it's just
tedious. I generally find that there are a small number of targets ( i.e.
`stats.timers.beta.request.users.index.{median,mean,upper_90}`) that I use. I
just switch out a few variables. `glink` lets you create a template with
default variables, and then pass those variables in to create a url.

## Usage

Install globally for cli usage
```bash
npm install -g glink
```


Or add to your current project for library usage
``` bash
npm install --save glink
```


### CLI Usage

The CLI uses a config located at `~/.glinkrc`. If you don't have one, upon first
usage it will write a default config for you (see `config.default.json` for the
current defaults). Once your config is there it will always use it. Update it as needed.

```bash
glink your items here --param1=value --param2=value
```


### Config Options

The config allows you to customize glink to be used with any type of target and
potential substitution varialbes you may need. The CLI simply takes each arg
you pass in and applies them, in order, to the variables defined in your config
`template`. If you pass in less variables than you have defined in your config
template, the config `templateDefaults` will be used.

For example, assume the following config:

```javascript
{
  "hostname": "graphite.example.com",
  "template": "foo.bar.##controller##.##action##.median",
  "templateDefaults": [
    "##controller##===user",
    "##action##===index"
  ],
  "paramsDefaults": {}
}
```

Note that there are two variables defined in the `template` (`##controller##`
and `##action##`), and two corresponding `templateDefaults` that use the same
syntax (You choose whatever syntax works for you... more below).

So given that config, if you run the following:

```bash
glink admins create --from=-1w
```

You would end up with the following link:

```bash
https://graphite.example.com/render?target=foo.bar.admins.create.median&from=-1w
```

Note that `##controller##` has been substituted for the first arg (`admins`),
and `##action##` with the second (`create`).

Given the same config, the following:

```bash
glink admins --from=-1w
```

Would produce the following link:

```bash
https://graphite.example.com/render?target=foo.bar.admins.index.median&from=-1w
```

Note that the first arg has been used and the default for `##action##` (in this
case `index`) was used as there was no second variable. The param
(`--from=-1w`) was still used and added as a query param.

### Params

Params (arguments in the shape of `--paramName=value`) are appended to the
created link as query params. You can define defaults using the
`paramsDefaults` key in your config. This is a great place to define things
that you don't want to have to type into the CLI args, but will always want.
They are overriden by any values you pass in as arguments. See [Graphite Graph
Parameter
Docs](http://graphite.readthedocs.org/en/latest/render_api.html#graph-parameters)
for more info on the available params.


### Library Usage

To use the library, pass in a config (same options as the cli config, but as a
JS object), and an array of arguments (just like you do in the cli)

```javascript
var glink = require('glink');

var config = {
  hostname: 'graphite.example.com',
  template: 'foo.bar.##controller##.##action##.mean',
  templateDefaults: [
    '##controller##***user',
    '##action##***index',
  ],
  templateDefaultDelimiter: '***',
  paramsDefaults: {
      width: '800',
      height: '600'
  }
};

var link = glink(config, ['admins', 'create', '--from=-4months'];);
// https://graphite.example.com/render?width=800&height=600&target=foo.bar.admins.create.mean&from=-4months
```


## Config Values and Defaults

KeyName     | Required? | Default       | Notes
----------- | --------- | ------------- | -------
| protocol  |           | https         | i.e. http or https
| hostname  |    X      | <none>        | i.e. graphite.example.com
| port      |           | <none>        | i.e. 443
| template  |    X      | <none>        | define your variables as needed, with whatever syntax
| templateDefaults| X   | <none>        | An array of strings
| templateDefaultDelimiter| | ===       | value used to split templateDefaults into variable and default value
| paramsDefaults |      |      {}       | an object with key, value param and value defaults to apply

#### templates
Your config `template` is a template used to create a graphite target. You can
substitute variables out of the template based on arguments passed into glink.
Define your variables with any syntax you want. In the examples above we are
using a `##variableName##` syntax. These will be replaced with arguments or the
values in your `templateDefaults` config values.

#### templateDefaults
Your ability to use any variable naming in your `template` is due to having
defaults defined in `templateDefaults`. This config option holds an array of
strings in a special syntax:

```bash
##variableName##===defaultValue
```

Where `##variableName##` is whatever you used in your `template` and `defaultValue`
is the default value to use should there not be enough args provided. In this
case we are using the `===` as a delimiter between the variable and default.
This is the default `templateDefaultDelimiter`. Should you wish to use another
delimiter make sure you update the `templateDefaultDelimiter` config value as
well.

For sanity define your `templateDefaults` in the same order they appear in your `template`.


## Utilities

There are several modules that may be useful on their own within glink. Here are a few of them:

### wrapTarget

```javascript
wrapTarget(target:string, func:string, value:string|number)
```

Takes a graphite target (i.e. `stats.timers.requests.users.index.mean`), and wraps it in a graphite function (i.e. `alias`), with the value.

```javascript
var wrapTarget = require('glink/lib/wrapTarget');

var target = 'stats.timers.requests.users.index.mean';
var newTarget = wrapTarget(target, 'alias', 'users index');
// "alias(stats.timers.requests.users.index.mean, 'users index')"
```



## Contributing

1. Fork it ( https://github.com/knomedia/glink/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request


## License and Copyright

MIT License

(c) 2015 Jason Madsen
