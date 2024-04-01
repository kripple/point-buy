/*
From OG Author:

Version 1.12.8
02/21/2021

To Do:

Future Releases:
More efficient getTotals
Redo house rules section
Honor / Sanity Support

*/
var initialLoad = true;

// Navigation Menu
$('.calcHead').click(function() {
  $('.points').show();
  $('.traits').show();
  $('.houseRules').hide();
  $('.rawDiv').hide();

  $('.calcHead').css({"color": "#beccda"});
  $('.houseHead').css("color", "#E8E8E8");
  $('.rawHead').css("color", "#E8E8E8");
});

$('.houseHead').click(function() {
  $('.points').hide();
  $('.traits').hide();
  $('.houseRules').show();
  $('.rawDiv').hide();

  $('.calcHead').css("color", "#E8E8E8");
  $('.houseHead').css("color", "#beccda");
  $('.rawHead').css("color", "#E8E8E8");
});

$('.rawHead').click(function() {
  $('.points').hide();
  $('.traits').hide();
  $('.houseRules').hide();
  $('.rawDiv').show();

  $('.calcHead').css("color", "#E8E8E8");
  $('.houseHead').css("color", "#E8E8E8");
  $('.rawHead').css("color", "#beccda");
});

// Copies URL to clipboard
$('.saveHead').on({
  "click": function() {
    $(this).tooltip({ items: ".saveHead", content: "URL copied to clipboard!<br>Paste to share your<br> build with a friend. :)"});
    $(this).tooltip("open");

    $('#urlCopied').show();
    urlCopied.innerHTML = window.location.href;
    var copiedText = document.querySelector("#urlCopied");
    copiedText.select();
    document.execCommand("Copy");
    $('#urlCopied').hide();
  },
    "mouseout": function() {
    $(this).tooltip("disable");
  }
});

// Changeling, Human, Simic Hybrid, Half-Elf, and Warforged Ability Choices
$('select').on('change', function( event ) {
  var attributeChange = this.id;
  var attributeSelect = $(this).find('option:selected').attr('value');
  var attributeValue = $('span#' + attributeSelect).html();

  if (attributeChange === 'ability1' || 'ability2' ) {
    $('span#' + attributeSelect).html( ++attributeValue );
    $('select#' + attributeChange ).on( 'change', function() {
      $('span#' + attributeSelect).html( --attributeValue );
      attributeSelect = null;
      getTotals();
    });
    getTotals();
  }
});

// Closes menu on mobile
$(document).on('click', function(event) {
	if ( !$(event.target).is('.menuCheck') && !$(event.target).is('.hamburger span') && !$(event.target).is('.saveHead') ) {
    $('.menuCheck').prop( 'checked', false );
  }
});

var attr1 = '';
var attr2 = '';

var Points = [-20, -16, -12, -9, -6, -4, -2, -1, 0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 19];
var PointsDefault = [-20, -16, -12, -9, -6, -4, -2, -1, 0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 19];

function getTotals() {

  var RaceChoice = $('select#Race').val();

  var AbilityModifiers = [-5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

  var AttributeStr = parseInt($('input#AttributeStr').val());
  var AttributeDex = parseInt($('input#AttributeDex').val());
  var AttributeCon = parseInt($('input#AttributeCon').val());
  var AttributeInt = parseInt($('input#AttributeInt').val());
  var AttributeWis = parseInt($('input#AttributeWis').val());
  var AttributeCha = parseInt($('input#AttributeCha').val());

  if (RaceChoice !== 'CustomRace') {
    var RacialStr = parseInt($('span#RacialStr').text());
    var RacialDex = parseInt($('span#RacialDex').text());
    var RacialCon = parseInt($('span#RacialCon').text());
    var RacialInt = parseInt($('span#RacialInt').text());
    var RacialWis = parseInt($('span#RacialWis').text());
    var RacialCha = parseInt($('span#RacialCha').text());
  }
  else {
    var RacialStr = parseInt($('input#RacialStr').val());
    var RacialDex = parseInt($('input#RacialDex').val());
    var RacialCon = parseInt($('input#RacialCon').val());
    var RacialInt = parseInt($('input#RacialInt').val());
    var RacialWis = parseInt($('input#RacialWis').val());
    var RacialCha = parseInt($('input#RacialCha').val());
  }

  var TotalStr = AttributeStr + RacialStr;
  var TotalDex = AttributeDex + RacialDex;
  var TotalCon = AttributeCon + RacialCon;
  var TotalInt = AttributeInt + RacialInt;
  var TotalWis = AttributeWis + RacialWis;
  var TotalCha = AttributeCha + RacialCha;

  $('span#TotalStr').html(TotalStr);
  $('span#TotalDex').html(TotalDex);
  $('span#TotalCon').html(TotalCon);
  $('span#TotalInt').html(TotalInt);
  $('span#TotalWis').html(TotalWis);
  $('span#TotalCha').html(TotalCha);

  var PointcostStr = Points[AttributeStr];
  var PointcostDex = Points[AttributeDex];
  var PointcostCon = Points[AttributeCon];
  var PointcostInt = Points[AttributeInt];
  var PointcostWis = Points[AttributeWis];
  var PointcostCha = Points[AttributeCha];

  var ModifierStr = AbilityModifiers[TotalStr];
  var ModifierDex = AbilityModifiers[TotalDex];
  var ModifierCon = AbilityModifiers[TotalCon];
  var ModifierInt = AbilityModifiers[TotalInt];
  var ModifierWis = AbilityModifiers[TotalWis];
  var ModifierCha = AbilityModifiers[TotalCha];

  var TotalCost = parseInt(PointcostStr) + parseInt(PointcostDex) + parseInt(PointcostCon) + parseInt(PointcostInt) + parseInt(PointcostWis) + parseInt(PointcostCha);
  var AvailablePointsTotal = AvailablePoints;

  var AvailablePoints = parseInt($('input#AvailablePoints').val());

  var AttributeMax = parseInt($('input#AttributeMax').val());
  var AttributeMin = parseInt($('input#AttributeMin').val());

  $('input#AttributeStr').attr('max', AttributeMax);
  $('input#AttributeDex').attr('max', AttributeMax);
  $('input#AttributeCon').attr('max', AttributeMax);
  $('input#AttributeInt').attr('max', AttributeMax);
  $('input#AttributeWis').attr('max', AttributeMax);
  $('input#AttributeCha').attr('max', AttributeMax);

  $('input#AttributeStr').attr('min', AttributeMin);
  $('input#AttributeDex').attr('min', AttributeMin);
  $('input#AttributeCon').attr('min', AttributeMin);
  $('input#AttributeInt').attr('min', AttributeMin);
  $('input#AttributeWis').attr('min', AttributeMin);
  $('input#AttributeCha').attr('min', AttributeMin);

  $('span#AvailablePointsTotal').html(AvailablePoints);
  $('span#TotalCost').html(TotalCost);

  $('span#PointcostStr').html(PointcostStr);
  $('span#PointcostDex').html(PointcostDex);
  $('span#PointcostCon').html(PointcostCon);
  $('span#PointcostInt').html(PointcostInt);
  $('span#PointcostWis').html(PointcostWis);
  $('span#PointcostCha').html(PointcostCha);

  $('span#ModifierStr').html(ModifierStr);
  $('span#ModifierDex').html(ModifierDex);
  $('span#ModifierCon').html(ModifierCon);
  $('span#ModifierInt').html(ModifierInt);
  $('span#ModifierWis').html(ModifierWis);
  $('span#ModifierCha').html(ModifierCha);

  if (!initialLoad) {
    var url = window.location.href.split("#")[0] + "#" + getHash();
    $("a.permalink").attr("href",url);
    $("a.permalink").html(url);
    window.location.replace(url);
  }
}

function loadHash(hash) {

  if (initialLoad) {

    initialLoad = false;

    var h = location.hash.replace("#","");
    var hsplit = h.split('&');
    var hrace = hsplit[0];
    var hsubrace = hsplit[1];
    var hstr = hsplit[2];
    var hdex = hsplit[3];
    var hcon = hsplit[4];
    var hint = hsplit[5];
    var hwis = hsplit[6];
    var hcha = hsplit[7];
    var hattr1 = hsplit[8];
    var hattr2 = hsplit[9];
    var havail = hsplit[10];
    var hmax = hsplit[11];
    var hmin = hsplit[12];
    var h18 = hsplit[13];
    var h17 = hsplit[14];
    var h16 = hsplit[15];
    var h15 = hsplit[16];
    var h14 = hsplit[17];
    var h13 = hsplit[18];
    var h12 = hsplit[19];
    var h11 = hsplit[20];
    var h10 = hsplit[21];
    var h9 = hsplit[22];
    var h8 = hsplit[23];
    var h7 = '-' + hsplit[24];
    var h6 = '-' + hsplit[25];
    var h5 = '-' + hsplit[26];
    var h4 = '-' + hsplit[27];
    var h3 = '-' + hsplit[28];
    var hrstr = hsplit[29] - 4;
    var hrdex = hsplit[30] - 4;
    var hrcon = hsplit[31] - 4;
    var hrint = hsplit[32] - 4;
    var hrwis = hsplit[33] - 4;
    var hrcha = hsplit[34] - 4;

    attr1 = hattr1;
    attr2 = hattr2;

    $('input#AvailablePoints').val(havail);
    $('input#AttributeMax').val(hmax);
    $('input#AttributeMin').val(hmin);

    $('input.value18').val(h18);
    $('input.value17').val(h17);
    $('input.value16').val(h16);
    $('input.value15').val(h15);
    $('input.value14').val(h14);
    $('input.value13').val(h13);
    $('input.value12').val(h12);
    $('input.value11').val(h11);
    $('input.value10').val(h10);
    $('input.value9').val(h9);
    $('input.value8').val(h8);
    $('input.value7').val(h7);
    $('input.value6').val(h6);
    $('input.value5').val(h5);
    $('input.value4').val(h4);
    $('input.value3').val(h3);

    Points = [-20, -16, -12, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18];

    $('select#Race option[data-rchoice="' + hrace + '"]').prop('selected', true);
    if (hsubrace != 'NA') {
      $(document).ready(getRace(hsubrace, hattr1, hattr2));
    }
    else if (hrace == 'customrace') {
      $(document).ready(raceCustomRace(hrstr, hrdex, hrcon, hrint, hrwis, hrcha));
    }
    else if (hrace == 'changeling' || hrace == 'simichybrid' || hrace == 'warforged') {
      $(document).ready(getRace(hsubrace, hattr1, hattr2));
    }
    else {
      $(document).ready(getRace());
    }

    $('input#AttributeStr').val(hstr);
    $('input#AttributeDex').val(hdex);
    $('input#AttributeCon').val(hcon);
    $('input#AttributeInt').val(hint);
    $('input#AttributeWis').val(hwis);
    $('input#AttributeCha').val(hcha);

    getTotals();
  }
}

function getHash() {
	var hash = "";
  var raceHash = $('option:selected', 'select#Race').data('rchoice');
  var subraceHash = $('option:selected', 'select#subRace').data('srchoice');
  var a1 = parseInt($('input#AttributeStr').val());
  var a2 = parseInt($('input#AttributeDex').val());
  var a3 = parseInt($('input#AttributeCon').val());
  var a4 = parseInt($('input#AttributeInt').val());
  var a5 = parseInt($('input#AttributeWis').val());
  var a6 = parseInt($('input#AttributeCha').val());
  var attrOne = $('select#ability1').prop('selectedIndex');
  var attrTwo = $('select#ability2').prop('selectedIndex');
  var availPoints = parseInt($('input#AvailablePoints').val());
  var maxPoints = parseInt($('input#AttributeMax').val());
  var minPoints = parseInt($('input#AttributeMin').val());
  var p18 = parseInt($('input.value18').val());
  var p17 = parseInt($('input.value17').val());
  var p16 = parseInt($('input.value16').val());
  var p15 = parseInt($('input.value15').val());
  var p14 = parseInt($('input.value14').val());
  var p13 = parseInt($('input.value13').val());
  var p12 = parseInt($('input.value12').val());
  var p11 = parseInt($('input.value11').val());
  var p10 = parseInt($('input.value10').val());
  var p9 = parseInt($('input.value9').val());
  var p8 = parseInt($('input.value8').val());
  var p7 = parseInt($('input.value7').val().replace('-', ''));
  var p6 = parseInt($('input.value6').val().replace('-', ''));
  var p5 = parseInt($('input.value5').val().replace('-', ''));
  var p4 = parseInt($('input.value4').val().replace('-', ''));
  var p3 = parseInt($('input.value3').val().replace('-', ''));
  var r1 = parseInt($('input#RacialStr').val()) + 4;
  var r2 = parseInt($('input#RacialDex').val()) + 4;
  var r3 = parseInt($('input#RacialCon').val()) + 4;
  var r4 = parseInt($('input#RacialInt').val()) + 4;
  var r5 = parseInt($('input#RacialWis').val()) + 4;
  var r6 = parseInt($('input#RacialCha').val()) + 4;

  if (raceHash === null) {
    raceHash = '&None';
  }
  else {
    raceHash = $('option:selected', 'select#Race').data('rchoice');
  }

  if (subraceHash === null) {
    subraceHash = '&None';
  }
  else if (subraceHash === undefined) {
    subraceHash = '&NA';
  }
  else {
    subraceHash = ('&' + $('option:selected', 'select#subRace').data('srchoice'));
  }

  if (attrOne === undefined) {
    attrOne = 'NA';
  }
  else {
    attrOne = $('select#ability1').prop('selectedIndex');
  }

  if (attrTwo === undefined) {
    attrTwo = 'NA';
  }
  else {
    attrTwo = $('select#ability2').prop('selectedIndex');
  }

  	  hash += raceHash;
      hash += subraceHash;
      hash += '&' + a1;
      hash += '&' + a2;
      hash += '&' + a3;
      hash += '&' + a4;
      hash += '&' + a5;
      hash += '&' + a6;
      hash += '&' + attrOne;
      hash += '&' + attrTwo;
      hash += '&' + availPoints;
      hash += '&' + maxPoints;
      hash += '&' + minPoints;
      hash += '&' + p18;
      hash += '&' + p17;
      hash += '&' + p16;
      hash += '&' + p15;
      hash += '&' + p14;
      hash += '&' + p13;
      hash += '&' + p12;
      hash += '&' + p11;
      hash += '&' + p10;
      hash += '&' + p9;
      hash += '&' + p8;
      hash += '&' + p7;
      hash += '&' + p6;
      hash += '&' + p5;
      hash += '&' + p4;
      hash += '&' + p3;
      hash += '&' + r1;
      hash += '&' + r2;
      hash += '&' + r3;
      hash += '&' + r4;
      hash += '&' + r5;
      hash += '&' + r6;

	return hash;
}

function fullReset() {

  $( document ).ready(function() {
  Points = [-20, -16, -12, -9, -6, -4, -2, -1, 0, 1, 2, 3, 4, 5, 7, 9, 12, 15, 19];

  $('div#RacialTraits').html('<dl id="RacialTraits"><h3>Racial Traits</h3></dl>');
  $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');

  $('input#AttributeMax').val('15');
  $('input#AttributeMin').val('8');
  $('input#AvailablePoints').val('27');

  $('select#Race').val('Select Race');
  $('td#SelectSubrace').html('');
  $('td#SubraceOption').html('');
  $('td#AbilityOption1').css('display', 'none');
  $('td#AbilityMod1').css('display', 'none');
  $('td#AbilityOption2').css('display', 'none');
  $('td#AbilityMod2').css('display', 'none');

  $('input#AttributeStr').val('8');
  $('input#AttributeDex').val('8');
  $('input#AttributeCon').val('8');
  $('input#AttributeInt').val('8');
  $('input#AttributeWis').val('8');
  $('input#AttributeCha').val('8');

  $('span#RacialStr').html('0');
  $('span#RacialDex').html('0');
  $('span#RacialCon').html('0');
  $('span#RacialInt').html('0');
  $('span#RacialWis').html('0');
  $('span#RacialCha').html('0');

  $('input.value18').val('19');
  $('input.value17').val('15');
  $('input.value16').val('12');
  $('input.value15').val('9');
  $('input.value14').val('7');
  $('input.value13').val('5');
  $('input.value12').val('4');
  $('input.value11').val('3');
  $('input.value10').val('2');
  $('input.value9').val('1');
  $('input.value8').val('0');
  $('input.value7').val('-1');
  $('input.value6').val('-2');
  $('input.value5').val('-4');
  $('input.value4').val('-6');
  $('input.value3').val('-9');

  $('select#ability1 option').eq(0).prop('selected', true);
  $('select#ability2 option').eq(0).prop('selected', true);
  $('select#ability1, select#ability2').children().attr('disabled', true).siblings().removeAttr('disabled');
  $('select#ability1, select#ability2').children('option[value=selected]').attr('disabled', true);

  $('div#customStr').css('display', 'none');
  $('span#RacialStr').css('display', 'block');

  $('div#customDex').css('display', 'none');
  $('span#RacialDex').css('display', 'block');

  $('div#customCon').css('display', 'none');
  $('span#RacialCon').css('display', 'block');

  $('div#customInt').css('display', 'none');
  $('span#RacialInt').css('display', 'block');

  $('div#customWis').css('display', 'none');
  $('span#RacialWis').css('display', 'block');

  $('div#customCha').css('display', 'none');
  $('span#RacialCha').css('display', 'block');

  $('input#RacialStr').val('0');
  $('input#RacialDex').val('0');
  $('input#RacialCon').val('0');
  $('input#RacialInt').val('0');
  $('input#RacialWis').val('0');
  $('input#RacialCha').val('0');

  getTotals();
  });
}

function pointsReset() {
  $('input#AttributeStr').val('8');
  $('input#AttributeDex').val('8');
  $('input#AttributeCon').val('8');
  $('input#AttributeInt').val('8');
  $('input#AttributeWis').val('8');
  $('input#AttributeCha').val('8');

  getTotals();
}

function getRace(hsubrace, hattr1, hattr2) {
  $('select#Race').change(function(e) {
    e.preventDefault();
  });
  $.getJSON( 'json/races_20210224.json', function( data ) {
    var html = [];
    var RaceChoice = $('select#Race').val();
    var subraceLoad = 'race' + RaceChoice;

    if ( RaceChoice !== "CustomRace") {
      $.each( data[RaceChoice].Subrace, function( key ) {
        var trimKey = key.replace(/-|'| /g, '').toLowerCase();
        var apostKey = key.replace(/'/g, "\'");
        html.push( '<option value="' + apostKey + '" data-srchoice="' + trimKey + '">' + key + '</option>' );
      });

      $('input#RacialStr').val('0');
      $('input#RacialDex').val('0');
      $('input#RacialCon').val('0');
      $('input#RacialInt').val('0');
      $('input#RacialWis').val('0');
      $('input#RacialCha').val('0');
    }

    var addSelect = html.join('');
    var subraceSelect = '<select id="subRace" onchange="race' + RaceChoice + '()" style="width: 90%;"><option value="selectSub" disabled selected>Select Subrace</option>' + addSelect + '</select>';
    var subraceVariant = '<select id="subRace" onchange="race' + RaceChoice + '()" style="width: 90%;"><option value="selectSub" selected data-srchoice="disabled">Disabled</option>' + addSelect + '</select>';

    raceReset();

  	if ( RaceChoice === "Aarakocra" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Aasimar" ) {
      $('td#SubraceOption').html('Aasimar Subrace:');
      $('td#SelectSubrace').html(subraceSelect);
    }
    else if ( RaceChoice === "Bugbear" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Centaur" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Changeling" ) {
      jsonRace();
      $('select#ability1 option').eq(hattr1).prop('selected', true);
      $('select#ability1').children('option[value=selected], option[value=RacialCha]').attr('disabled', true);
      $('select#ability1').change();
    }
  	else if ( RaceChoice === "Dragonborn" ) {
      jsonRace();
      $( document ).ready(chooseType());
    }
    else if ( RaceChoice === "Dwarf" ) {
  		$('td#SubraceOption').html('Dwarf Subrace:');
  		$('td#SelectSubrace').html(subraceSelect);
      jsonRace();
    }
    else if ( RaceChoice === "Elf" ) {
  		$('td#SubraceOption').html('Elf Subrace:');
  		$('td#SelectSubrace').html(subraceSelect);
      jsonRace();
    }
    else if ( RaceChoice === "Firbolg" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Genasi" ) {
  		$('td#SubraceOption').html('Genasi Subrace:');
  		$('td#SelectSubrace').html(subraceSelect);
      jsonRace();
    }
    else if ( RaceChoice === "Gith" ) {
      $('td#SubraceOption').html('Gith Subrace:');
      $('td#SelectSubrace').html(subraceSelect);
      jsonRace();
    }
    else if ( RaceChoice === "Gnome" ) {
  		$('td#SubraceOption').html('Gnome Subrace:');
  		$('td#SelectSubrace').html(subraceSelect);
    }
    else if ( RaceChoice === "Goblin" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Goliath" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Grung" ) {
      jsonRace();
    }
    else if ( RaceChoice === "HalfElf" ) {
      $('td#SubraceOption').html('Variant Half-Elf:');
      $('td#SelectSubrace').html(subraceVariant);
      $('select#ability1 option').eq(hattr1).prop('selected', true);
      $('select#ability2 option').eq(hattr2).prop('selected', true);
    }
    else if ( RaceChoice === "HalfOrc" ) {
      $('td#SubraceOption').html('Half-Orc Subrace:');
  		$('td#SelectSubrace').html(subraceVariant);
    }
    else if ( RaceChoice === "Halfling" ) {
  		$('td#SubraceOption').html('Halfling Subrace:');
  		$('td#SelectSubrace').html(subraceSelect);
      jsonRace();
    }
    else if ( RaceChoice === "Hobgoblin" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Human" ) {
  		$('td#SubraceOption').html('Variant Human:');
  		$('td#SelectSubrace').html(subraceVariant);
      $('select#ability1 option').eq(hattr1).prop('selected', true);
      $('select#ability2 option').eq(hattr2).prop('selected', true);
    }
    else if ( RaceChoice === "Kalashtar" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Kenku" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Kobold" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Leonin" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Lizardfolk" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Locathah" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Loxodon" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Minotaur" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Orc" ) {
      $('td#SubraceOption').html('Variant Orc:');
  		$('td#SelectSubrace').html(subraceVariant);
    }
    else if ( RaceChoice === "Satyr" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Shifter" ) {
      $('td#SubraceOption').html('Shifter Subrace:');
      $('td#SelectSubrace').html(subraceSelect);
      jsonRace();
    }
    else if ( RaceChoice === "SimicHybrid" ) {
      jsonRace();
      $('select#ability1').children('option[value=selected], option[value=RacialCon]').attr('disabled', true);
      $('select#ability1 option').eq(hattr1).prop('selected', true);
      $('select#ability1').change();
    }
    else if ( RaceChoice === "Tiefling" ){
  		$('td#SubraceOption').html('Variant Tiefling');
      $('td#SelectSubrace').html('<select id="subRace" onchange="raceTiefling()" style="width: 90%;"><option value="selectSub" selected data-srchoice="disabled">Disabled</option><option value="Devil\'s Tongue Tiefling" data-srchoice="devilstonguetielfling">Devil&#39;s Tongue Tiefling</option><option value="Feral Tiefling" data-srchoice="feraltiefling">Feral Tiefling</option><option value="Hellfire Tiefling" data-srchoice="hellfiretiefling">Hellfire Tiefling</option><option value="Winged Tiefling" data-srchoice="wingedtiefling">Winged Tiefling</option><option value="Descendant of Asmodeus" data-srchoice="asmodeus">Descendant of Asmodeus</option><option value="Descendant of Baalzebul" data-srchoice="baalzebul">Descendant of Baalzebul</option><option value="Descendant of Dispater" data-srchoice="dispater">Descendant of Dispater</option><option value="Descendant of Fierna" data-srchoice="fierna">Descendant of Fierna</option><option value="Descendant of Glasya" data-srchoice="glasya">Descendant of Glasya</option><option value="Descendant of Levistus" data-srchoice="levistus">Descendant of Levistus</option><option value="Descendant of Mammon" data-srchoice="mammon">Descendant of Mammon</option><option value="Descendant of Mephistopheles" data-srchoice="mephistopheles">Descendant of Mephistopheles</option><option value="Descendant of Zariel" data-srchoice="zariel">Descendant of Zariel</option></select>');
    }
    else if ( RaceChoice === "Tabaxi") {
      jsonRace();
    }
    else if ( RaceChoice === "Tortle" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Triton") {
      jsonRace();
    }
    else if ( RaceChoice === "Vedalken" ) {
      jsonRace();
    }
    else if ( RaceChoice === "Warforged" ) {
      jsonRace();
      $('select#ability1 option').eq(hattr1).prop('selected', true);
      $('select#ability1').children('option[value=selected], option[value=RacialCon]').attr('disabled', true);
      $('select#ability1').change();
    }
    else if ( RaceChoice === "YuanTi") {
      jsonRace();
    }
    else if ( RaceChoice === "CustomRace") {
      raceCustomRace();
    }

    $('select#subRace').val('selectSub');
    if (hsubrace !== 'None' || null || undefined || 'NA') {
      $('select#subRace option[data-srchoice="' + hsubrace + '"]').prop('selected', true);
      window[subraceLoad]();
    }
    else if (hsubrace == 'None') {
      $('td#SelectSubrace').html(subraceSelect);
    }
  });
}

function jsonRace() {
  initialLoad = false;
  $('div#RacialTraits').html('<dl id="RacialTraits"><h3>Racial Traits</h3></dl>');
  $.getJSON( 'json/races_20210224.json', function( data ) {
    var race = $('select#Race').val();
    var subrace = $('select#subRace').val();
    var html = [];
    $.each( data[race].Traits, function( key, val ) {
      if (key=="Types") return undefined;
      else if (key=="Constructs") return undefined;
      else
      html.push( '<dt><b>' + key + '</b></dt><dd><span>' + val + '</span></dd>' );
    });
    $( '<dl/>', {
      "class": "RacialTraits",
       html: html.join('')
    }).appendTo ('div#RacialTraits');

    if (race === 'Changeling' || race === 'SimicHybrid' || race === 'Warforged' || subrace === 'Dragonmark of Detection' || subrace === 'Dragonmark of Handling' || subrace === 'Dragonmark of Making' || subrace === 'Dragonmark of Passage') {
      $('td#AbilityOption1, td#AbilityMod1').css('display', 'table-cell');
      $('td#AbilityOption2, td#AbilityMod2').css('display', 'none');
    }
    else if ( (race === 'HalfElf' && subrace === 'selectSub') || race === 'HalfElf' && subrace === 'Half-Elf Variant' || (race === 'Human' && subrace === 'Human Variant')) {
      $('td#AbilityOption1, td#AbilityMod1, td#AbilityOption2, td#AbilityMod2').css('display', 'table-cell');
    }
    else {
      $('td#AbilityOption1, td#AbilityMod1, td#AbilityOption2, td#AbilityMod2').css('display', 'none');
    }

    if ( subrace == 'Dragonmark of Passage' ) {
      $('span#RacialDex').html( data[race].AbilityScores.Dexterity );
    }
    else if ( race == 'SimicHybrid' || race == 'Warforged' ) {
      $('span#RacialCon').html( data[race].AbilityScores.Constitution );
    }
    else if ( subrace == 'Dragonmark of Making' ) {
      $('span#RacialInt').html( data[race].AbilityScores.Intelligence );
    }
    else if ( subrace == 'Dragonmark of Detection' || subrace == 'Dragonmark of Handling' ) {
      $('span#RacialWis').html( data[race].AbilityScores.Wisdom );
    }
    else if ( race == 'Changeling' || ( race == 'HalfElf' && subrace !== 'Dragonmark of Detection' )) {
      $('span#RacialCha').html( data[race].AbilityScores.Charisma );
    }
    else {
      $('span#RacialStr').html( data[race].AbilityScores.Strength );
      $('span#RacialDex').html( data[race].AbilityScores.Dexterity );
      $('span#RacialCon').html( data[race].AbilityScores.Constitution );
      $('span#RacialInt').html( data[race].AbilityScores.Intelligence );
      $('span#RacialWis').html( data[race].AbilityScores.Wisdom );
      $('span#RacialCha').html( data[race].AbilityScores.Charisma );
    }
    if ( ( race === 'HalfElf' && subrace === 'selectSub' ) ) {
      $('select#ability1').change();
      $('select#ability2').change();
    }
    getTotals();
  });
}

function jsonSubrace() {
  $.getJSON( 'json/races_20210224.json', function( data ) {
    var race = $('select#Race').val();
    var subrace = $('select#subRace').val();
    var html = [];
    $.each( data[race].Subrace[subrace].Changes, function( key, val ) {
      var raceChanges = $('div#RacialTraits').html().replace( '<dt><b>' + key + '</b></dt><dd><span>' + val + '</span></dd>' , '<dt><s>' + key + '</s></dt><dd><span><s>' + val  + '</s></span></dd>' );
      $('div#RacialTraits').html( raceChanges );
    });
    $.each( data[race].Subrace[subrace].Traits, function( key, val ) {
      if (key=="Types") return undefined;
      else
      html.push( '<dt><b>' + key + '</b></dt><dd><span>' + val + '</span></dd>' );
    });
    $('div#SubraceTraits').html('<dl id="SubraceTraits"><h4>' + subrace + ' Traits</h4></dl>');
    $( '<dl/>', {
      "class": "SubraceTraits",
       html: html.join('')
    }).appendTo ('div#SubraceTraits');
    $('span#RacialStr').html( data[race].Subrace[subrace].AbilityScores.Strength );
    $('span#RacialDex').html( data[race].Subrace[subrace].AbilityScores.Dexterity );
    $('span#RacialCon').html( data[race].Subrace[subrace].AbilityScores.Constitution );
    $('span#RacialInt').html( data[race].Subrace[subrace].AbilityScores.Intelligence );
    $('span#RacialWis').html( data[race].Subrace[subrace].AbilityScores.Wisdom );
    $('span#RacialCha').html( data[race].Subrace[subrace].AbilityScores.Charisma );
    if ( subrace === 'Human Variant' || subrace === 'Half-Elf Variant' || subrace === 'Dragonmark of Detection' || subrace === 'Dragonmark of Handling' || subrace === 'Dragonmark of Making' || subrace === 'Dragonmark of Passage') {
      $('select#ability1').change();
      $('select#ability2').change();
    }
    getTotals();
  });
}

function raceReset() {
  var race = $('select#Race').val();
  $('span#RacialStr').html('0');
  $('span#RacialDex').html('0');
  $('span#RacialCon').html('0');
  $('span#RacialInt').html('0');
  $('span#RacialWis').html('0');
  $('span#RacialCha').html('0');
  $('div#RacialTraits').html('<dl id="RacialTraits"><h3>Racial Traits</h3></dl>');
  $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');
  $('td#SubraceOption').html('');
  $('td#SelectSubrace').html('');

  $('div#customStr').css('display', 'none');
  $('span#RacialStr').css('display', 'block');

  $('div#customDex').css('display', 'none');
  $('span#RacialDex').css('display', 'block');

  $('div#customCon').css('display', 'none');
  $('span#RacialCon').css('display', 'block');

  $('div#customInt').css('display', 'none');
  $('span#RacialInt').css('display', 'block');

  $('div#customWis').css('display', 'none');
  $('span#RacialWis').css('display', 'block');

  $('div#customCha').css('display', 'none');
  $('span#RacialCha').css('display', 'block');

  $('select#ability1 option').eq(0).prop('selected', true);
  $('select#ability2 option').eq(0).prop('selected', true);

  if ( race !== 'HalfElf' || race !== 'Human' ) {
    $('select#ability1, select#ability2').children().attr('disabled', true).siblings().removeAttr('disabled');
    $('select#ability1, select#ability2').children('option[value=selected]').attr('disabled', true);
  }
//  if ( race == 'Changeling' ) {
//    $('select').change(function() {
//      $('select#ability1').children('option[value=selected]').attr('disabled', true).siblings().removeAttr('disabled');
//    });
//  }
//  initialLoad = true;
  getTotals();
}

function raceCustomRace(hrstr, hrdex, hrcon, hrint, hrwis, hrcha) {
  $('div#customStr').css('display', 'block');
  $('input#RacialStr').val('0');
  $('span#RacialStr').css('display', 'none');

  $('div#customDex').css('display', 'block');
  $('input#RacialDex').val('0');
  $('span#RacialDex').css('display', 'none');

  $('div#customCon').css('display', 'block');
  $('input#RacialCon').val('0');
  $('span#RacialCon').css('display', 'none');

  $('div#customInt').css('display', 'block');
  $('input#RacialInt').val('0');
  $('span#RacialInt').css('display', 'none');

  $('div#customWis').css('display', 'block');
  $('input#RacialWis').val('0');
  $('span#RacialWis').css('display', 'none');

  $('div#customCha').css('display', 'block');
  $('input#RacialCha').val('0');
  $('span#RacialCha').css('display', 'none');

  if (isNaN(hrstr, hrdex, hrcon, hrint, hrwis, hrcha)) {
  }
  else {
    $('input#RacialStr').val(hrstr);
    $('input#RacialDex').val(hrdex);
    $('input#RacialCon').val(hrcon);
    $('input#RacialInt').val(hrint);
    $('input#RacialWis').val(hrwis);
    $('input#RacialCha').val(hrcha);
  }

//  initialLoad = false;
  getTotals();
}

function raceAasimar() {
  var aasimarRacial = $('select#subRace').val();
 	if ( aasimarRacial === "Protector Aasimar" ) {
    jsonRace();
    jsonSubrace();
 	}
 	else if ( aasimarRacial === "Scourge Aasimar") {
    jsonRace();
    jsonSubrace();
 	}
  else if ( aasimarRacial === "Fallen Aasimar") {
    jsonRace();
    jsonSubrace();
 	}
  else if ( aasimarRacial === "Aasimar DMG") {
    jsonRace();
    jsonSubrace();
  }
  else {
    jsonRace();
    $('div#SubraceTraits').html('');
  }
}

function raceDwarf() {
  var dwarfRacial = $('select#subRace').val();
 	if ( dwarfRacial === "Hill Dwarf" ) {
    jsonSubrace();
 	}
 	else if ( dwarfRacial === "Mountain Dwarf") {
    jsonSubrace();
 	}
  else if ( dwarfRacial === "Duergar") {
    jsonSubrace();
 	}
  else if ( dwarfRacial === "Dragonmark of Warding") {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceElf() {
  var elfRacial = $('select#subRace').val();
 	if ( elfRacial === "Drow" ) {
    jsonSubrace();
 	}
  else if ( elfRacial === "Eladrin" ) {
    jsonSubrace();
  }
  else if ( elfRacial === "Eladrin MToF" ) {
    jsonSubrace();
  }
 	else if ( elfRacial === "High Elf" ) {
    jsonSubrace();
 	}
  else if ( elfRacial === "Wood Elf" ) {
    jsonSubrace();
 	}
  else if ( elfRacial === "Sea Elf" ) {
    jsonSubrace();
  }
  else if ( elfRacial === "Shadar-Kai" ) {
    jsonSubrace();
  }
  else if ( elfRacial === "Dragonmark of Shadow" ) {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceGenasi() {
  var genasiRacial = $('select#subRace').val();
 	if ( genasiRacial === "Air Genasi" ) {
    jsonSubrace();
 	}
 	else if ( genasiRacial === "Earth Genasi" ) {
    jsonSubrace();
 	}
 	else if ( genasiRacial === "Fire Genasi" ) {
    jsonSubrace();
 	}
 	else if ( genasiRacial === "Water Genasi" ) {
    jsonSubrace();
 	}
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceGith() {
  var githRacial = $('select#subRace').val();
 	if ( githRacial === "Githyanki" ) {
    jsonSubrace();
 	}
  else if ( githRacial === "Githzerai" ) {
    jsonSubrace();
  }
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceGnome() {
  jsonRace();
  var gnomeRacial = $('select#subRace').val();
 	if ( gnomeRacial === "Forest Gnome" ) {
    jsonSubrace();
 	}
  else if ( gnomeRacial === "Rock Gnome" ) {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
 	else if (gnomeRacial === "Deep Gnome" ) {
    jsonSubrace();
 	}
  else if ( gnomeRacial === "Dragonmark of Scribing" ) {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceHalfElf() {
  jsonRace();
  var halfelfRacial = $('select#subRace').val();

  $('select#subRace').change(function() {
    $('select#ability1, select#ability2').prop('disabled', false);
    $('select#ability1').val('selected');
    $('select#ability2').val('selected');
    $('select#ability1').change();
    $('select#ability2').change();
  });

  if ( halfelfRacial === "Half-Elf Variant" ) {
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').prop('disabled', true).siblings().prop('disabled', false);
      $('select#ability1, select#ability2').not(this).children('option[value=selected], option[value=RacialCha]').prop('disabled', true);
    });
    $('select#ability1, select#ability2').children('option[value=selected], option[value=RacialCha]').prop('disabled', true);
  }
  else if ( halfelfRacial === "Dragonmark of Detection" ) {
    $('select#ability1, select#ability2').prop('disabled', false);
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').prop('disabled', true).siblings().prop('disabled', false);
      $('select#ability1, select#ability2').not(this).children('option[value=selected], option[value=RacialWis]').prop('disabled', true);
    });
    $('select#ability1 option[value=RacialWis]').prop('disabled', true);
  }
  else if ( halfelfRacial === "Dragonmark of Storm" ) {
  }
  else if ( halfelfRacial === "selectSub" ) {
    $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').prop('disabled', true).siblings().prop('disabled', false);
      $('select#ability1, select#ability2').not(this).children('option[value=selected], option[value=RacialCha]').prop('disabled', true);
    });
    $('select#ability1, select#ability2').children('option[value=selected], option[value=RacialCha]').prop('disabled', true);
  }

  jsonSubrace();
  $( document ).ready(chooseType());
}

function raceHalfOrc() {
  var halforcRacial = $('select#subRace').val();
  jsonRace();
  if ( halforcRacial === "Dragonmark of Finding" ) {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
 	else {
    $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');
  }
}

function raceHalfling() {
  var halflingRacial = $('select#subRace').val();
 	if ( halflingRacial === "Ghostwise Halfling" ) {
    jsonSubrace();
 	}
  else if ( halflingRacial === "Lightfoot Halfling" ) {
    jsonSubrace();
  }
 	else if ( halflingRacial === "Stout Halfling" ) {
    jsonSubrace();
 	}
  if ( halflingRacial === "Dragonmark of Healing" ) {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
  if ( halflingRacial === "Dragonmark of Hospitality" ) {
    jsonSubrace();
    $( document ).ready(chooseType());
  }
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceHuman() {
  jsonRace();
  var humanRacial = $('select#subRace').val();

  $('select#subRace').change(function() {
    $('select#ability1, select#ability2').prop('disabled', false);
    $('select#ability1').val('selected');
    $('select#ability2').val('selected');
    $('select#ability1').change();
    $('select#ability2').change();
  });

 	if ( humanRacial === "Human Variant" ) {
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').attr('disabled', true).siblings().removeAttr('disabled');
      $('select#ability1, select#ability2').not(this).children('option[value=selected]').attr('disabled', true);
    });
 		$('div#raceDescription').html('');
    $('dl#humanSubrace').html('');
 	}
  else if ( humanRacial === "Dragonmark of Finding" ) {
  }
  else if ( humanRacial === "Dragonmark of Handling" ) {
    $('select#ability1, select#ability2').prop('disabled', false);
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').prop('disabled', true).siblings().prop('disabled', false);
      $('select#ability1, select#ability2').not(this).children('option[value=selected], option[value=RacialWis]').prop('disabled', true);
    });
    $('select#ability1 option[value=RacialWis]').prop('disabled', true);
  }
  else if ( humanRacial === "Dragonmark of Making" ) {
    $('select#ability1, select#ability2').prop('disabled', false);
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').prop('disabled', true).siblings().prop('disabled', false);
      $('select#ability1, select#ability2').not(this).children('option[value=selected], option[value=RacialInt]').prop('disabled', true);
    });
    $('select#ability1 option[value=RacialWis]').prop('disabled', true);
  }
  else if ( humanRacial === "Dragonmark of Passage" ) {
    $('select#ability1, select#ability2').prop('disabled', false);
    $('select').change(function() {
      $('select#ability1, select#ability2').not(this).children('option[value=' + this.value + ']').prop('disabled', true).siblings().prop('disabled', false);
      $('select#ability1, select#ability2').not(this).children('option[value=selected], option[value=RacialDex]').prop('disabled', true);
    });
    $('select#ability1 option[value=RacialWis]').prop('disabled', true);
  }
  else if ( humanRacial === "Dragonmark of Sentinel" ) {
  }
 	else {
    $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');
    $('select#ability1').val('selected');
    $('select#ability2').val('selected');
    $('select#ability1, select#ability2').children('option').attr('disabled', true).siblings().removeAttr('disabled');
    $('select#ability1, select#ability2').children('option[value=selected]').attr('disabled', true);
 	}

  jsonSubrace();
  $( document ).ready(chooseType());
}

function raceOrc() {
  var orcRacial = $('select#subRace').val();
  jsonRace();
 	if ( orcRacial === "Eberron Orc" ) {
    jsonSubrace();
 	}
 	else {
    $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');
  }
}

function raceShifter() {
  var shifterRacial = $('select#subRace').val();
 	if ( shifterRacial === "Beasthide Shifter" ) {
    jsonSubrace();
 	}
  else if ( shifterRacial === "Longtooth Shifter" ) {
    jsonSubrace();
  }
 	else if ( shifterRacial === "Swiftstride Shifter" ) {
    jsonSubrace();
 	}
  else if ( shifterRacial === "Wildhunt Shifter" ) {
    jsonSubrace();
  }
  else {
    $('div#SubraceTraits').html('');
  }
}

function raceTiefling() {
  jsonRace();
  var tieflingRacial = $('select#subRace').find('option:selected').attr('data-srchoice');
 	if ( tieflingRacial === "feraltiefling" ) {
    jsonSubrace();
 	}
 	else if ( tieflingRacial === "devilstonguetielfling" ) {
    jsonSubrace();
 	}
 	else if ( tieflingRacial === "hellfiretiefling" ) {
    jsonSubrace();
 	}
 	else if ( tieflingRacial === "wingedtiefling" ) {
    jsonSubrace();
 	}
  else if ( tieflingRacial === "asmodeus" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "baalzebul" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "dispater" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "fierna" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "glasya" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "levistus" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "mammon" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "mephistopheles" ) {
    jsonSubrace();
  }
  else if ( tieflingRacial === "zariel" ) {
    jsonSubrace();
  }
  else {
    $('div#RacialTraits').html('<dl id="RacialTraits"><h3>Racial Traits</h3></dl>');
    $('div#SubraceTraits').html('<dl id="SubraceTraits"></dl>');
  }
}

function chooseType() {
  $.getJSON( 'json/races_20210224.json', function( data ) {
    var html = [];
    var race = $('select#Race').val();
    var subrace = $('select#subRace').val();
    if ( race ===  "Dragonborn" || subrace === "Dragonmark of Detection" || subrace === "Dragonmark of Finding" || subrace === "Dragonmark of Handling" || subrace === "Dragonmark of Healing" || subrace === "Dragonmark of Hospitality" || subrace === "Dragonmark of Making" || subrace === "Dragonmark of Passage" || subrace === "Dragonmark of Scribing" || subrace === "Dragonmark of Sentinel" || subrace === "Dragonmark of Shadow" || subrace === "Dragonmark of Storm" || subrace === "Dragonmark of Warding" ) {
      if ( race ===  "Dragonborn" ) {
        $( 'div#RacialTraits' ).append( '<table class="TypesTable"><thead><tr><th style="width: 10%;" ></th><th style="width: 20%; text-align: left;">' + 'Dragon' + '</th><th style="width: 20%; text-align: left;">' + 'Damage Type' + '</th><th style="width: 40%; text-align: left;">' + 'Breath Weapon' + '</th><th style="width: 10%;"></th></tr></thead><tbody id="Join">');
        for (var i = 0; i < data[race].Traits.Types.length; i++ ) {
          html = $( '<tr/>', {"class": "Types" } );
          html.append( '<td></td>' );
          html.append( '<td>' + data[race].Traits.Types[i].tdata1 + '</td>' );
          html.append( '<td>' + data[race].Traits.Types[i].tdata2 + '</td>' );
          html.append( '<td>' + data[race].Traits.Types[i].tdata3 + '</td>' );
          html.append( '<td></td>' );
          $( 'tbody#Join' ).append(html);
        }
      }
      else {
        $( 'div#SubraceTraits' ).append( '<table class="TypesTable"><thead><tr><th style="width: 10%;" ></th><th style="width: 10%; text-align: left;">' + 'Spell Level' + '</th><th style="width: 70%; text-align: left;">' + 'Spells' + '</th><th style="width: 10%; text-align: left;"></th></tr></thead><tbody id="Join">');
        for (var j = 0; j < data[race].Subrace[subrace].Traits.Types.length; j++ ) {
          html = $( '<tr/>', {"class": "Types" } );
          html.append( '<td></td>' );
          html.append( '<td>' + data[race].Subrace[subrace].Traits.Types[j].tdata1 + '</td>' );
          html.append( '<td>' + data[race].Subrace[subrace].Traits.Types[j].tdata2 + '</td>' );
          html.append( '<td></td>' );
          $( 'tbody#Join' ).append(html);
        }
      }
      $( 'div#RacialTraits' ).append( '</tbody></table>');
    }
    else if ( subrace === "Half-Elf Variant" || subrace === "Rock Gnome") {
      $( 'div#SubraceTraits' ).append( '<table><tbody><tr><td style="width: 5%;"></td><td style="width: 95%;" id="Types" class="Types"></td><td></td>' );
      $.each( data[race].Subrace[subrace].Traits.Types, function( key, val ) {
        html.push( '<dt><b>' + key + '</b></dt><dd><span>' + val + '</span></dd>' );
      });
      $( '<dl/>', {
        "class": "Types",
         html: html.join('')
      }).appendTo ('td#Types');
      $( 'div#SubraceTraits' ).append( '</tr></tbody></table>');
    }
  });
}

function increment(e) {
  var e = window.event || e;
  var evt = e.target || e.srcElement;
  var abilityType = evt.value;
  var abilityScore = parseInt($('input#' + [abilityType]).val());
  var abilityMax = '';
  if (abilityType == 'AttributeMax' ) {
    abilityMax = $('input#AttributeMax').attr('max');
    pointsReset();
  }
  else if (abilityType == 'AttributeMin' ) {
    abilityMax = parseInt($('input#AttributeMax').val());
    pointsReset();
  }
  else if (abilityType == 'AvailablePoints' ) {
    abilityMax = $('input#AvailablePoints').attr('max');
  }
  else if (abilityType.indexOf('Racial') === 0 ) {
    abilityMax = $('input#' + abilityType).attr('max');
  }
  else {
    abilityMax = parseInt($('input#AttributeMax').val());
  }

  if (abilityScore == abilityMax) {
    abilityType = null;
    return false;
  }
  else {
    $('input#' + [abilityType]).val(function(i, abilityVal) {
      return ++abilityVal;
    });
    abilityType = null;
  }
  getTotals();
}

function decrement(e) {
  var e = window.event || e;
  var evt = e.target || e.srcElement;
  var abilityType = evt.value;
  var abilityScore = parseInt($('input#' + [abilityType]).val());
  var abilityMin = '';
  if (abilityType == 'AttributeMax' ) {
    abilityMin = $('input#AttributeMin').val();
    pointsReset();
  }
  else if (abilityType == 'AttributeMin' ) {
    abilityMin = $('input#AttributeMin').attr('min');
    pointsReset();
  }
  else if (abilityType == 'AvailablePoints' ) {
    abilityMin = $('input#AvailablePoints').attr('min');
  }
  else if (abilityType.indexOf('Racial') === 0 ) {
    abilityMin = $('input#' + abilityType).attr('min');
  }
  else {
    abilityMin = parseInt($('input#AttributeMin').val());
  }

  if (abilityScore <= abilityMin) {
    abilityType = null;
    return false;
  }
  else {
    $('input#' + [abilityType]).val(function(i, abilityVal) {
      return --abilityVal;
    });
  abilityType = null;
  }
  getTotals();
}

function increase(e) {
  var e = window.event || e;
  var evt = e.target || e.srcElement;
  var abilityNumber = evt.value;
  var abilityScore = parseInt($('input.value' + [abilityNumber]).val());

  var abilityMax = parseInt($('input.value' + [abilityNumber]).attr('max'));
  var abilityMin = parseInt($('input.value' + [abilityNumber]).attr('min'));
  var high = 18;

  if (abilityScore == abilityMax) {
    abilityNumber = null;
    return false;
  }
  else if (abilityNumber < 8) {
    $('input.value' + [abilityNumber]).val(function(i, abilityVal) {
      do {
        ++Points[abilityNumber];
        --abilityNumber;
      }
      while (abilityNumber >= 3);
      return ++abilityVal;
    });
  }
  else {
    $('input.value' + [abilityNumber]).val(function(i, abilityVal) {
      while (high >= abilityNumber) {
        ++Points[abilityNumber];
        abilityNumber++;
      }
      return ++abilityVal;
    });
  }
  pointsReset();
  for (var j=3; j<=18; j++) {
    $('input.value' + [j]).val(Points[j]);
  }
}

function decrease(e) {
  var e = window.event || e;
  var evt = e.target || e.srcElement;
  var abilityNumber = evt.value;
  var abilityScore = parseInt($('input.value' + [abilityNumber]).val());

  var abilityMax = parseInt($('input.value' + [abilityNumber]).attr('max'));
  var abilityMin = parseInt($('input.value' + [abilityNumber]).attr('min'));
  var low = 3;

  if (abilityScore == abilityMin) {
    abilityNumber = null;
    return false;
  }
  else if (abilityNumber >= 8) {
    $('input.value' + [abilityNumber]).val(function(i, abilityVal) {
      do {
        --Points[abilityNumber];
        ++abilityNumber;
      }
      while (abilityNumber <= 18);
      return --abilityVal;
    });
  }
  else {
    $('input.value' + [abilityNumber]).val(function(i, abilityVal) {
      while (low <= abilityNumber) {
        --Points[abilityNumber];
        abilityNumber--;
      }
      return --abilityVal;
    });
  }
  pointsReset();
  for (var j=3; j<=18; j++) {
    $('input.value' + [j]).val(Points[j]);
  }
}

$(document).ready(function() {
  if (window.location.hash != "") {
    loadHash(window.location.hash);
  }
});
