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

#								BUILD DEFS 									#
#############################################################################

build: _ui_header bootstrap csl styles _ui_footer
build-light: _ui_header csl styles _ui_footer
build-all: _ui_header bootstrap jquery csl styles _ui_footer
	

#############################################################################
#								DISPLAY COMPONENTS							#
#############################################################################
_ui_header:
	@echo "$(shell date +%I:%M:%S%p) - Build Starting				"
	@echo
	@echo
	@echo "		Building Project				"
	@echo "${HR}"
	@echo
_ui_footer:
	@echo
	@echo "${HR}"
	@echo
	@echo
	@echo "$(shell date +%I:%M:%S%p) - Build Complete				"

#								BOOTSTRAP 									#
#############################################################################
bootstrap: _bootstrap_compile _bootstrap_compress _bootstrap_remove_uncompressed _bootstrap_complete
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
_bootstrap_complete:
	@echo "Bootstrap					${CHECK}"
#									JQUERY 									#
#############################################################################
jquery: _jquery_get _jquery_compress _jquery_complete
#############################################################################
#############################################################################
_jquery_get:
	@curl --compressed -o  ${OUT}/js/jquery.js -s 'http://code.jquery.com/jquery-latest.js' 
_jquery_compress:
	@uglifyjs -c -mt -nc --lift-vars ${OUT}/js/jquery.js > ${OUT}/js/jquery.min.js
_jquery_complete:
	@echo "jQuery					${CHECK}"

#								CLIENT SIDE JS LIB 							#
#############################################################################
csl: _csl_compile _csl_compress _csl_clean_uncompressed _csl_complete
#############################################################################
#############################################################################
_csl_compile:
	@cat ${ASSETS}/js/csl/*.js > ${OUT}/js/csl.js
_csl_compress:
	@uglifyjs -c -mt -nc --lift-vars ${OUT}/js/csl.js > ${OUT}/js/csl.min.js
_csl_clean_uncompressed:
	@rm ${OUT}/js/csl.js
_csl_complete:
	@echo "Client Side Lib					${CHECK}"

#								STYLES 										#
#############################################################################
styles: _styles_compile _styles_compress _styles_clean_uncompressed _styles_complete
#############################################################################
#############################################################################
_styles_compile:
	@recess --compile ${ASSETS}/less/index.less > ${OUT}/css/index.css
_styles_compress:
	@recess --compress ${OUT}/css/index.css > ${OUT}/css/index.min.css
_styles_clean_uncompressed:
	@rm ${OUT}/css/index.css
_styles_complete:
	@echo "Stylesheets and LESS				${CHECK}"

#############################################################################
.PHONY: build
#############################################################################