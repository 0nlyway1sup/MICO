<?php
/*******************************************************************************
 *******************************************************************************
 ** Author: Samuel Levy <sam@samuellevy.com>
 ** 
 ** File: upgrade/versions/0.12.4b.php
 ** 
 ** Description: DB upgrader for version 0.12.4b
 **
 ** Copyright (c) 2012 Samuel Levy
 ** 
 ** Mico is free software: you can redistribute it and/or
 ** modify it under the terms of the GNU Lesser General Public License as
 ** published by the Free Software Foundation, either version 3 of the License,
 ** or (at your option) any later version.
 **
 ** This program is distributed in the hope that it will be useful, but WITHOUT
 ** ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 ** FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License
 ** for more details.
 **
 ** You should have received a copy of the GNU Lesser General Public License
 *******************************************************************************
 ******************************************************************************/

/*******************************************************************************
 *******************************************************************************
 ** CHANGELOG
 **
 ** - Multiple fixes for systems where php_short_open_tags is disabled
 ** - Fixed issue with js includes in debug mode (used WEB_ROOT instead of APP_ROOT)
 *******************************************************************************
 ******************************************************************************/

// If we're not accessed in the correct way, die
if (defined('CONFIGURED')) {
    // Set the version number
    $VERSION = '0.12.4b';
    
    // Do not change this line - it's what tells the system that the upgrade is complete
    Settings::set('MICO_VERSION',$VERSION);
} else {
    die ("No direct access allowed");
}
?>