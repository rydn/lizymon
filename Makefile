OUT = ./out
ASSETS = ./assets

BOOTSTRAP_LESS = ./assets/less/bootstrap/bootstrap.less
BOOTSTRAP_LESS_RESPONSIVE = ./assets/less/bootstrap/responsive.less

BOOTSTRAP_CSS = ./out/css/bootstrap.css
BOOTSTRAP_CSS_RESPONSIVE = ./out/css/bootstrap-responsive.css

BOOTSTRAP_JS = ./assets/js/bootstrap/*.js


DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

#								BUILD   									#
#############################################################################
build:
	@make _ui_header
	
	@make build_bootstrap > /dev/null
	@echo "${CHECK}		Bootstrap"

	@make jquery > /dev/null
	@echo "${CHECK}		jQuery"

#############################################################################
#								DISPLAY COMPONENTS							#
#############################################################################
_ui_header:
	@echo
	@echo
	@echo "		Building Project				"
	@echo "${HR}"

#								BOOTSTRAP 									#
#############################################################################
build_bootstrap: _bootstrap_compile _bootstrap_compress _bootstrap_remove_uncompressed
#############################################################################

#############################################################################
#############################################################################
_bootstrap_compile:
	@recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP_CSS}
	@recess --compile ${BOOTSTRAP_LESS_RESPONSIVE} > ${BOOTSTRAP_CSS_RESPONSIVE}

	@cat ${BOOTSTRAP_JS} > ${OUT}/js/bootstrap.js

_bootstrap_compress:
	@recess --compress ${BOOTSTRAP_CSS} > ${OUT}/css/bootstrap.min.css
	@recess --compress ${BOOTSTRAP_CSS_RESPONSIVE} > ${OUT}/css/bootstrap-responsive.min.css

	@uglifyjs -c -mt -nc --lift-vars ${OUT}/js/bootstrap.js > ${OUT}/js/bootstrap.min.js

_bootstrap_remove_uncompressed:
	@rm -f ${OUT}/js/bootstrap.js

	@rm -f ${OUT}/css/bootstrap.css
	@rm -f ${OUT}/css/bootstrap-responsive.css
#									JQUERY 									#
#############################################################################
jquery: _jquery_get _jquery_compress
#############################################################################
#############################################################################
_jquery_get:
	@curl 'http://code.jquery.com/jquery-latest.js' > ${OUT}/js/jquery.js
_jquery_compress:
	@uglifyjs -c -mt -nc --lift-vars ${OUT}/js/jquery.js > ${OUT}/js/jquery.min.js

#############################################################################
.PHONY: build
#############################################################################