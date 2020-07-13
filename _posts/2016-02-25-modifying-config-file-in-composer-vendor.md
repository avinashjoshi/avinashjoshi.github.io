---
layout: post
title: Modifying config / file in vendor project (via composer)
tags: composer vendor config modify file php cakephp
---

Let me start by saying that I understand - its not a good idea / practice to change vendor files.
But there are situations, where this cannot be avoided!

Recently when using [mPDF](http://www.mpdf1.com/mpdf/index.php) package with [CakePHP](http://cakephp.org)
via [composer](http://getcomposer.org) at <https://github.com/mpdf/mpdf>,
I needed to touch one of the config files in the package
- specifically the `config_fonts.php` as there was a need to change or add default fonts[^mpdf-change-font] when generating pdf.

## A solution
One solution is to manually download the package and add it to your "Library" folder. This will unfortunately increase the size of your codebase!

## My Solution
We can leverage the `post-autoload-dump` event in composer[^post-autoload-dump] to generate / overwrite the config file (after first backing up the original file)!
The only thing to be maintained in our repository was the config file to be overwritten.

I created a `postAutoloadDump()` static function inside my `Install` class and added that to the `post-autoload-dump` event in `composer.json`.
Here is a very basic CakePHP code (similar method can be used for any generic php project):

### file: `src/Console/Installer.php`
```php
<?php
#### truncated_code ####
class Installer
{
    public static function postAutoloadDump(Event $event)
    {
        $config = $event->getComposer()->getConfig();
        $vendorDir = realpath($config->get('vendor-dir'));

        $originalFile = $vendorDir . '/mpdf/mpdf/config_fonts.php';
        $backupFile = $vendorDir .  '/mpdf/mpdf/config_fonts-orig.php';
        $customFontFile = dirname(__DIR__) .  '/../config/for_mpdf/config_fonts.php';

        //Create a backup
        copy($originalFile, $backupFile);

        //Overwrite the config file
        copy($customFontFile, $originalFile);
     }
#### truncated_code ####
}
?>
```

### file: `composer.json`
```javascript
{
/**** truncated_code ****/
    "scripts": {
        "post-install-cmd": "App\\Console\\Installer::postInstall",
        "post-autoload-dump": [
            "Cake\\Composer\\Installer\\PluginInstaller::postAutoloadDump",
            "App\\Console\\Installer::postAutoloadDump"
        ]
    }
/**** truncated_code ****/
}
```

[^mpdf-change-font]: Changing fonts in mPDF <https://github.com/mpdf/mpdf#fonts>.
[^post-autoload-dump]: Composer documentation on [scripts](https://getcomposer.org/doc/articles/scripts.md).