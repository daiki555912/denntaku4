'use strict'
{
  const num_bth = document.querySelectorAll('.num_bth');
  let output_sub = document.getElementById('output_sub');//計算結果を表示する場所
  const output_total = document.getElementById('output_total');//計算過程を表示する場所
  let total = 0;//計算式を表す変数 
  let state = 'start';//最初の状態を定義
  let mode = 'integer_mode'; //最初は整数入力モード
  

  // 1-9の数字ボタンを押した時
    const one_nine = document.querySelectorAll('.one_nine');
    one_nine.forEach(index => {     
      index.addEventListener('click', () => {
        if(state === 'start') {
          total = index.dataset.indexId;         
        }else if(state === 'finish') {
          reset();
          total = index.dataset.indexId;  
        }else if(state === 'calculation'||state === 'calBtn'){
          total += index.dataset.indexId;
        }     
        output_sub.textContent = total;
        state = 'calculation'//数字を入力している状態にする。
      })  
    })
    
    
  // 0の数字ボタンを押した時
  const zero = document.getElementById('zero');
  zero.addEventListener('click', () => {
  if(state==='start'||state==='finish'||state==='calBtn'){
      if(output_sub.textContent.slice(-1) === '0') {
        console.log('前の文字はゼロ');
        return;
      }
    }

    if(state==='start') {
      total = zero.dataset.indexId;  
    }else{
      total += zero.dataset.indexId;
    }      
    output_sub.textContent = total;
  })    

  // 「.」小数点ボタンを押した時
  const point = document.getElementById('point');
  point.addEventListener('click', () => {
    console.log(point.dataset.indexId)
    if(mode === 'decimal_mode'){
      return;
       }      
    //「.4」と入力したら0.4としたい。(1)+(2)で0.4となる
    if(state==='start'||state==='finish') {
      total = 0;//(1)最初と計算終了直後なら、0を入力
    }else if(state==='calBtn'){
      if(output_sub.textContent.slice(-1)!=='0'){
        total += 0;
      }   
    }
    total += point.dataset.indexId;//(2)「.」を入力

    output_sub.textContent = total;
    state = 'calculation'//数字を入力している状態にする。
    mode = 'decimal_mode'; //小数入力モードに変更
  })   


  //「＋　÷　－　×」ボタンを押した時
  const cal = document.querySelectorAll('.cal');
  cal.forEach(index => {     
    index.addEventListener('click', () => {
      if(state === 'start') {
        return;
      }else if(state === 'calculation'){
        total += index.dataset.indexId;
      }else if(state === 'finish'){
        total = output_total.textContent;
        total += index.dataset.indexId;
        output_total.textContent = 0
      }else if(state ==='calBtn') {
        total = total.slice(0, -1)
        total += index.dataset.indexId;
      }

      output_sub.textContent = total;
      state = 'calBtn'//演算記号を入力している状態する。
      mode ='integer_mode'//整数モードに戻す
    })  
  })
  
  
  //イコールを押した時
  const equal_btn = document.getElementById('equal_btn');
  equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = eval(total);
    state = 'finish'//計算が終わった状態にする。
    mode ='integer_mode'//整数モードに戻す
  });

  //Cボタン（リセットボタン）を押した時の処理
  const clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    reset();
  })

 //リセットを行う関数
  function reset() {
    total = 0; 
    output_sub.textContent = 0;
    output_total.textContent = 0;
    mode ='integer_mode'//整数モードに戻す
  }

  //BSボタン（バックスペース）を押した時の処理
  const bs = document.getElementById('bs')
  bs.addEventListener('click', () => {
    console.log('BS')
    if(state ==="finish") {
      return;
    }else{
      total = output_sub.textContent.slice(0, -1);
      output_sub.textContent = total;
    }
  })

}