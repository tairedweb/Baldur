<?php
defined('_JEXEC') or die('Restricted access');
?>
<?php echo '<?xml version="1.0" encoding="utf-8"?'.'>'; ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>" > 
    
<head>
   <jdoc:include type="head" />
    <script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/dist/js/dist.min.js"> </script>
    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/dist/css/bootstrap.min.css" type="text/css" />
    
    <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/dist/css/dist.min.css" type="text/css" />
</head>

<body>
    
<div class="container">
    <?php if ($this->countModules( 'sidebar1 or sidebar2' )) : ?>
        <?php $sidebarwidth = "col-sm-3"; $contentwidth = "col-sm-9"; ?>
    <?php elseif ($this->countModules( 'sidebar1 and sidebar2' )) : ?>    
        <?php $sidebarwidth = "col-sm-3"; $contentwidth = "col-sm-6"; ?>
    <?php else : ?>
        <?php $contentwidth = "col-sm-12"; ?>
    <?php endif; ?>
    
    <?php if ($this->countModules( 'sidebar1' )) : ?>
        <div id="sidebar1" class="<?php echo $sidebarwidth; ?>">
            <jdoc:include type="modules" name="sidebar1" style="xhtml" />
        </div>
    <?php endif; ?>
    
    <div id="main" class="<?php echo $contentwidth; ?>">
        <jdoc:include type="message" />
        <jdoc:include type="component" />
    </div>
    
    <?php if ($this->countModules( 'sidebar2' )) : ?>
        <div id="sidebar1" class="<?php echo $sidebarwidth; ?>">
            <jdoc:include type="modules" name="sidebar2" style="xhtml" />
        </div>
    <?php endif; ?>
</div>

</body>
</html>