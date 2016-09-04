describe('Protractor Demo App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var result = element(by.xpath('//h2'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));
  var dropdown = element(by.xpath('//select'));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    dropdown.sendKeys('+');
    goButton.click();
  }

  function sub(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    dropdown.sendKeys('-');
    goButton.click();
  }

  function multi(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    dropdown.sendKeys('*');
    goButton.click();
  }

  function div(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    dropdown.sendKeys('/');
    goButton.click();
  }

  function remind(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    dropdown.sendKeys('%');
    goButton.click();
  }

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('validate calculator operations', function() {
    expect(dropdown.getText()).toEqual('+\n/\n%\n*\n-');
   });
  
  it('defaul operation should be add operation', function() {
    expect(dropdown.$('option:checked').getText()).toEqual('+');
   });  

  it('should start out with an empty history', function () {
     expect(history.count()).toEqual(0);
  });

  it('should add one and two', function() {
    add(1, 2);
    expect(result.getText()).toEqual('3');
    expect(latestResult.getText()).toEqual('3');
  });

  it('shouldn\'t add x and two', function() {
    add('x', 2);
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t add one and x', function() {
    add(2, 'x');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t add x and y', function() {
    add('x', 'y');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('should subtract two and one', function() {
    sub(2, 1);
    expect(result.getText()).toEqual('1');
    expect(latestResult.getText()).toEqual('1');
  });  
 
  it('shouldn\'t subtract x and one', function() {
    sub('x', 1);
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t subtract two and x', function() {
    sub(2, 'x');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t subtract x and y', function() {
    sub('x', 'y');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });  
  
  it('should multiply two and four', function() {
    multi(2, 4);
    expect(result.getText()).toEqual('8');
    expect(latestResult.getText()).toEqual('8');
  });    
  
  it('shouldn\'t multiply x and one', function() {
    multi('x', 1);
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t multiply two and x', function() {
    multi(2, 'x');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t multiply x and y', function() {
    multi('x', 'y');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });  
  
  it('should divide eight by two', function() {
    div(8, 2);
    expect(result.getText()).toEqual('4');
    expect(latestResult.getText()).toEqual('4');
  });    
  
  it('shouldn\'t divide x and one', function() {
    div('x', 1);
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t divide two and x', function() {
    div(2, 'x');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t divide x and y', function() {
    div('x', 'y');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });    
  
  it('should get reminder of seven by two', function() {
    remind(7, 2);
    expect(result.getText()).toEqual('1');
    expect(latestResult.getText()).toEqual('1');
  });   
  
  it('shouldn\'t reminder x and one', function() {
    remind('x', 1);
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t reminder two and x', function() {
    remind(2, 'x');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });

  it('shouldn\'t reminder x and y', function() {
    remind('x', 'y');
    expect(result.getText()).toEqual('NaN');
    expect(latestResult.getText()).toEqual('NaN');
  });  

  it('should have a history', function() {
    add(1, 2);
    expect(result.getText()).toEqual('3');
    expect(history.count()).toEqual(1);
    expect(history.first().getText()).toContain('1 + 2');
    expect(history.first().getText()).toContain('3');
    sub(4, 3);
    expect(result.getText()).toEqual('1');
    expect(history.count()).toEqual(2);
    expect(history.first().getText()).toContain('4 - 3');
    expect(history.first().getText()).toContain('1');
    expect(history.last().getText()).toContain('1 + 2');
    expect(history.last().getText()).toContain('3');    
    add(5, 6);
    expect(result.getText()).toEqual('11');
    expect(history.count()).toEqual(3);
    expect(history.first().getText()).toContain('5 + 6');
    expect(history.first().getText()).toContain('11');   
    expect(history.last().getText()).toContain('1 + 2');
    expect(history.last().getText()).toContain('3');    
  });  

});
