


const SRC_SETTING = jsEdit.getFromEditText("SRC_SETTING");

if(
	!SRC_SETTING
) {
	jsToast.short("SRC_SETTING must be type");
	exitZero();
};
jsQr.createAndSaveRnd(
	SRC_SETTING
);
jsDialog.imageDialog(
	"answer image",
	"${tempQrPngPath}",
);