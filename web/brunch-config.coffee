exports.config =
  paths:
    watched: ['app','vendor','test']
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(vendor|node_modules)/
      order:
        before: [
          'vendor/scripts/three.min.js',
          'vendor/scripts/jquery-2.1.4.min.js',
        ]

    stylesheets:
      joinTo: 'stylesheets/app.css'
#      order:
#        before: ['vendor/styles/normalize.css']

    templates:
      joinTo: 'javascripts/templates.js'

  modules:
    nameCleaner: (path) ->
      path.replace(/^(app|vendorlib)\//, '')