
const powerPokerAppId = "power_poker";

const efectType = {
  one: '!1',
  two: '(2B',
  three: '+3',
  four: '+4s',
  jorker: '!!',
  mark4Comp: '+13MC',
  mark4Same: '+13MS',
  num4Same: '+13NS',
  num4Continue: '+13NC',
}

const efectRegexType = {
  one: '\\!1',
  two: '\\(2B',
  three: '\\+3',
  four: '\\+4s',
  jorker: '\\!\\!',
  mark4Comp: '\\+13MC',
  mark4Same: '\\+13MS',
  num4Same: '\\+13NS',
  num4Continue: '\\+13NC',
}

const SWITCH_PARTS_ID = {
  menuButtonBox: 'menuButtonBox',
  switchViewNav: 'switchViewNav',
  overlay: 'overlay',
  viewSwitchButton: 'viewSwitchButton',
  settingButton: 'settingButton'
};

const CLASS_FOR_SWITCH = {
  open: 'open',
  disabled: 'disabled',
  noDisplay: 'noDisplay',
};

const switchViewChangeType = {
  hand: 'back',
  dust: 'dust',
  shrine: 'shrine',
}

const currentFazeType = {
  hand: 'hand',
  dust: 'dust',
  shrine: 'shrine',
  pullEnemyShrine: 'Pull enemyShine'
}

const displayHandModeType = {
  normal: 'normal',
  ace: 'ace',
}

const confirmDialogType = {
  menu: 'menu',
  putFix: 'putFix',
  acePutFix: 'acePutFix',
}

const SWITCH_BUTTON_TEXT = {
  switch: 'switch',
  close: 'close',
}

const cardsDataMapOrderKey = {
  playerField: 0,
  enemyField: 1,
  playerHand: 2,
  enemyHand: 3,
  playerDust: 4,
  enemyDust: 5,
  playerShrine: 6,
  enemyShrine: 7,
  dekiMountain: 8,
};

const sizeSeries = {
  handSize: 5,
  finishTotalSheetsSize: 10,
  finishTotalTurn: 4,
}


let sortScaleList = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cardTypeList = ['♣', '♥', '♠', '◆'];
let redMarkList = ['♥', '◆'];
let jorkers = new Array(2).fill('#\n!');
let strFactNumberMap = new Map(
  [
    ["A", 1],
    ["J", 13],
    ["Q", 13],
    ["K", 13],
    ["!", 26],
  ])
let strNumberMap = new Map(
  [
    ["A", 1],
    ["J", 11],
    ["Q", 12],
    ["K", 13],
    ["!", 26],
  ])
let noDuplicationPutList = ["2", "4", "5", "J", "Q", "K", "!"];

var cardsDataBackupMap = new Map(
  [
    [cardsDataMapOrderKey.playerField, []],
    [cardsDataMapOrderKey.enemyField, []],
    [cardsDataMapOrderKey.playerHand, []],
    [cardsDataMapOrderKey.enemyHand, []],
    [cardsDataMapOrderKey.playerDust, ["♥\nA", "♥\n4", "♠\n4", "♥\n7","♥\n8", "♥\nQ"]],
    [cardsDataMapOrderKey.enemyDust, ["♥\nA", "♥\n4", "♠\n4", "♥\n7","♥\n8", "♥\nQ"]],
    [cardsDataMapOrderKey.playerShrine, []],
    [cardsDataMapOrderKey.enemyShrine, ["♥\nA", "♥\n4", "♠\n4", "♥\n7","♥\n8", "♥\nQ"]],
    [cardsDataMapOrderKey.dekiMountain, []],
  ]
);

var cardsTmpDataMap = new Map(
  [
    [cardsDataMapOrderKey.playerField, []],
    [cardsDataMapOrderKey.enemyField, []],
    [cardsDataMapOrderKey.playerHand, []],
    [cardsDataMapOrderKey.enemyHand, []],
    [cardsDataMapOrderKey.playerDust, []],
    [cardsDataMapOrderKey.enemyDust, []],
    [cardsDataMapOrderKey.playerShrine, []],
    [cardsDataMapOrderKey.enemyShrine, []],
    [cardsDataMapOrderKey.dekiMountain, []],
  ]
);

const onContinue = confirm("Continue?");
init(onContinue);


new Vue({
  el: `#${powerPokerAppId}`,
  data: makeData(),
  computed: {},
  methods: {
    enemyDisplayFieldStyle: function(
      card,
      index
    ){
      return execDisplayFieldStyle(
        card,
        index,
        this
      )
    },
    playerDisplayFieldStyle: function(
      card,
      index
    ){
      return execDisplayFieldStyle(
        card,
        index,
        this
      )
    },
    playerDisplayDustStyle: function(
      card,
      index
    ){
      return execDisplayFieldStyle(
        card,
        index,
        this
      )
    },
    enemyDisplayDustStyle: function(
      card,
      index
    ){
      return execDisplayFieldStyle(
        card,
        index,
        this
      )
    },
    playerDisplayShrineStyle: function(
      card,
      index
    ){
      return execDisplayFieldStyle(
        card,
        index,
        this
      )
    },
    enemyDisplayShrineStyle: function(
      card,
      index
    ){
      return execDisplayFieldStyle(
        card,
        index,
        this
      )
    },
    enemyScoreStyle: function(
    ){
      return execEnemyScoreStyle(
        this
      )
    },
    playerScoreStyle: function(
    ){
      return execPlayerScoreStyle(
        this
      )
    },
    enemyShineStyle: function(
    ){
      return execEnemyShineStyle(
        this
      )
    },
    playerShineStyle: function(
    ){
      return execPlayerShineTotal(
        this
      )
    },
    enemyTotalStyle: function(
    ){
      return execEnemyTotalStyle(
        this
      )
    },
    playerTotalStyle: function(
    ){
      return execPlayerTotalStyle(
        this
      )
    },
    currentFazeStyle: function(){
      return execCurrentFazeStyle(
        this
      )
    },
    displayHandStyle: function(
      currentPutNum,
      index
    ){
      return execDisplayHandStyle(
        currentPutNum,
        index,
        this
      )
    },
    displayAceHandStyle: function(
      currentPutNum,
      index
    ){
      return execDisplayAceHandStyle(
        currentPutNum,
        index,
        this
      )
    },
    put: function(event){
      const putHandStr = event.target.textContent
      updateCardsDataHandler(
        putHandStr,
        this,
      )
    },
    putOnAce: function(event){
      const putHandStr = event.target.textContent
      updateCardsDataHandlerOnAce(
        putHandStr,
        this,
      )
    },
    fixOrOtherHandler: function(event){
      execFixOrOtherHandler(this)
    },
    aceFixPut: function(event){
      execAceFixPut(this)
    },
    noFixPut: function(event){
      execNoFixPut(this)
    },
    noAceFixPut: function(event){
      execNoFixPutOnAce(this)
    },
    overayOpen: function(envent){
      $(OPEN_PARTS_NAME.nav).removeClass('open');
    },
    openSetting: function(event){},
    switchButtonEvent: function(event){
      execSwitchButtonEvent(event)      
    },
    switchView: function(event){
      execSwitchView(
        this,
        event
      );
    },
    closeOverlay: function(){
      closeSwitchBar()
    }
  },
  created(){
    registerTotal(this)
    registerScore(this)
  },
  watch: {
    enableUserPlay: function(){
      if(this.enableUserPlay) return
      execPullByPlayer(this)
      putByEnemy(this)
      this.playerEfect = "";
      this.enemyEfect = "";
      registerTotal(this)
      registerScore(this)
      execPullByEnemy(this)
      this.enableUserPlay = true
    },
    enemyEfect: function(){
      cardEfect(
        this
      );
    },
    playerEfect: function(){
      cardEfect(
        this
      );
    }
  }
})
