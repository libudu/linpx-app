
const ac = plus.android.runtimeMainActivity();  
const win = plus.android.invoke(ac, "getWindow");
const view = plus.android.invoke(win, "getDecorView")
const lp = plus.android.invoke(win, 'getAttributes')
const Color = plus.android.importClass('android.graphics.Color')

const SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN = plus.android.getAttribute(view, "SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN")
const SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION = plus.android.getAttribute(view, "SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION")

const FLAG_TRANSLUCENT_NAVIGATION = plus.android.getAttribute(lp, "FLAG_TRANSLUCENT_NAVIGATION")

const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = plus.android.getAttribute(lp, 'FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS')


// 底部透明化
export const transparentNavigation = function(){
	plus.android.invoke(view, 'setSystemUiVisibility', SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION)
	plus.android.invoke(win, 'clearFlags', FLAG_TRANSLUCENT_NAVIGATION)
	plus.android.invoke(win, 'addFlags', FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
	plus.android.invoke(win, 'setNavigationBarColor', Color.TRANSPARENT)
}

// 底部显示
export const showNavigation = function(){
	plus.android.invoke(view, 'setSystemUiVisibility', SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN)
}

// 底部隐藏
export const hideNavigation = function(){
	plus.navigator.hideSystemNavigation()
}