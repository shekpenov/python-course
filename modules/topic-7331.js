export default {
  id: 'topic-7331',
  code: '7.3.3.1',
  title: 'Цикл while в Python',
  layout: 'single',

  sections: [
    {
      heading: 'Как работает while',
      content: `
<p>Цикл <code>while</code> выполняет блок кода снова и снова, пока условие истинно. Как только условие стало <code>False</code> — цикл останавливается.</p>
<pre><code class="language-python">while условие:
    # тело цикла</code></pre>
<p><strong>Главное правило:</strong> внутри цикла должно что-то меняться, иначе он никогда не остановится — это <em>бесконечный цикл</em>. Поэтому всегда увеличивай счётчик: <code>i += 1</code>.</p>
<pre><code class="language-python">i = 1
while i <= 5:
    print(i)
    i += 1   # без этой строки — бесконечный цикл!
# Выведет: 1 2 3 4 5</code></pre>`,
      example: {
        title: 'Обратный отсчёт',
        code: `n = 5
while n > 0:
    print(n)
    n -= 1
print("Старт!")`
      },
      task: {
        prompt: 'Напишите цикл <code>while</code>, который выводит числа от <strong>1 до 7</strong>, каждое на новой строке. Первая строка вывода: <em>1</em>, последняя: <em>7</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `i = 1\nwhile i <= 7:\n    print(i)\n    i += 1`,
        hint: 'Заведите переменную <code>i = 1</code>. Условие цикла: <code>while i <= 7</code>. В теле: <code>print(i)</code> и <code>i += 1</code>.',
        test: (out, code) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines.length === 7 && lines[0] === '1' && lines[6] === '7' && code.includes('while');
        }
      }
    },

    {
      heading: 'Накопитель — считаем сумму',
      content: `
<p>Часто цикл нужен чтобы что-то <em>накапливать</em>: сумму, произведение, количество. Для этого заводят переменную-накопитель <strong>до</strong> цикла и обновляют её <strong>внутри</strong>:</p>
<pre><code class="language-python">s = 0          # накопитель (начальное значение 0)
i = 1
while i <= 10:
    s += i     # s = s + i
    i += 1
print(s)       # 55</code></pre>
<div class="tip"><strong>Запомни:</strong> накопитель суммы начинается с <code>0</code>, накопитель произведения — с <code>1</code>.</div>`,
      example: {
        title: 'Сумма квадратов',
        code: `s = 0
i = 1
while i <= 5:
    s += i ** 2   # 1 + 4 + 9 + 16 + 25
    i += 1
print(s)  # 55`
      },
      task: {
        prompt: 'Используя цикл <code>while</code>, вычислите сумму <strong>1 + 2 + 3 + … + 20</strong> и выведите результат. Ожидаемый ответ: <em>210</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `s = 0\ni = 1\nwhile i <= 20:\n    s += i\n    i += 1\nprint(s)`,
        hint: 'Заведите <code>s = 0</code> и <code>i = 1</code>. Условие: <code>while i <= 20</code>. Внутри: <code>s += i</code>, потом <code>i += 1</code>.',
        test: (out, code) => out.trim() === '210' && code.includes('while')
      }
    },

    {
      heading: 'Накопитель — считаем произведение',
      content: `
<p>Для произведения накопитель начинается с <code>1</code> (умножение на 0 даст 0). Например, факториал числа <em>n</em> — это <em>1 × 2 × 3 × … × n</em>:</p>
<pre><code class="language-python">n = 5
i = 1
result = 1     # начало с 1!
while i <= n:
    result *= i    # result = result * i
    i += 1
print(result)  # 120</code></pre>`,
      example: {
        title: 'Степень числа через while',
        code: `base = 2
exp = 8
result = 1
while exp > 0:
    result *= base
    exp -= 1
print(result)  # 256`
      },
      task: {
        prompt: 'Вычислите факториал числа <strong>7</strong> используя цикл <code>while</code>. Факториал: <em>1×2×3×4×5×6×7</em>. Ожидаемый ответ: <em>5040</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `n = 7\ni = 1\nresult = 1\nwhile i <= n:\n    result *= i\n    i += 1\nprint(result)`,
        hint: 'Накопитель произведения: <code>result = 1</code>. Умножайте: <code>result *= i</code>. Цикл: <code>while i <= 7</code>.',
        test: (out, code) => out.trim() === '5040' && code.includes('while')
      }
    },

    {
      heading: 'Практика: сумма чётных',
      content: `<p>Внутри цикла <code>while</code> можно использовать условие <code>if</code> — чтобы обрабатывать только нужные числа. Например, пропускать нечётные и накапливать только чётные.</p>`,
      example: {
        title: 'Сумма чисел кратных 3',
        code: `s = 0
i = 1
while i <= 20:
    if i % 3 == 0:
        s += i
    i += 1
print(s)  # 3+6+9+12+15+18 = 63`
      },
      task: {
        prompt: 'Используя цикл <code>while</code>, вычислите сумму всех <strong>чётных</strong> чисел от 1 до 20 включительно. Ожидаемый ответ: <em>110</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `s = 0\ni = 1\nwhile i <= 20:\n    if i % 2 == 0:\n        s += i\n    i += 1\nprint(s)`,
        hint: 'Внутри цикла добавьте <code>if i % 2 == 0:</code> перед накоплением суммы. Строка <code>i += 1</code> должна быть вне этого условия — она выполняется всегда.',
        test: (out, code) => out.trim() === '110' && code.includes('while') && code.includes('if')
      }
    },

    {
      heading: 'Практика: найти нужное число',
      content: `<p>Цикл <code>while</code> может работать не только со счётчиком, но и с накопителем в условии. Например: «продолжай, пока сумма не превысила 100».</p>`,
      example: {
        title: 'Первое число где сумма > 30',
        code: `n = 0
s = 0
while s <= 30:
    n += 1
    s += n
print(n)  # 8, так как 1+2+...+8=36>30`
      },
      task: {
        prompt: 'Найдите наименьшее число <code>n</code>, при котором сумма <strong>1+2+3+…+n превышает 100</strong>. Выведите это число <code>n</code>. Ожидаемый ответ: <em>14</em> (1+2+…+14 = 105 > 100).',
        starterCode: `# ваш код здесь
`,
        solution: `n = 0\ns = 0\nwhile s <= 100:\n    n += 1\n    s += n\nprint(n)`,
        hint: 'Начните с <code>n = 0, s = 0</code>. Условие цикла: <code>while s <= 100</code>. Внутри: сначала увеличьте <code>n</code>, потом добавьте <code>n</code> к <code>s</code>.',
        test: (out, code) => out.trim() === '14' && code.includes('while')
      }
    },

    {
      heading: 'Практика: степени двойки',
      content: `<p>Цикл <code>while</code> удобен когда не знаешь заранее сколько шагов нужно — только условие остановки.</p>`,
      example: {
        title: 'Сколько раз делить пополам',
        code: `n = 100
count = 0
while n > 1:
    n //= 2
    count += 1
print(count)  # 6`
      },
      task: {
        prompt: 'Найдите наименьшее <code>n</code>, при котором <strong>2ⁿ > 1000</strong>. Выведите это число. Ожидаемый ответ: <em>10</em> (2¹⁰ = 1024 > 1000).',
        starterCode: `# ваш код здесь
`,
        solution: `n = 1\nwhile 2**n <= 1000:\n    n += 1\nprint(n)`,
        hint: 'Начните с <code>n = 1</code>. Условие: <code>while 2**n <= 1000</code>. Внутри просто увеличивайте <code>n += 1</code>. Когда цикл закончится — <code>n</code> и есть ответ.',
        test: (out, code) => out.trim() === '10' && code.includes('while')
      }
    }
  ]
};
