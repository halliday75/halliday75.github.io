// Smartling directive function declarations (required to survive minification)
function sl_translate() {}

sl_tr_start     = sl_translate;
sl_tr_end       = sl_translate;
sl_notr_start   = sl_translate;
sl_notr_end     = sl_translate;
sl_tr_html_start = sl_translate;
sl_tr_html_end   = sl_translate;
sl_tr_json_start = sl_translate;
sl_tr_json_end   = sl_translate;


const me = {
  // ► Smartling translation block ◄
  sl_tr_tart();
  enData: {
    LO_TITLE: "Log Out Alert",
    LO_MESSAGE: "You have been logged out due to inactivity",
    LO_CONTINUE: "Go to Login Screen"
  }
  sl_tr_end();
};
