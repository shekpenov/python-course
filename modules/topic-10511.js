export default {
  id: 'topic-10511',
  code: '10.5.1.1',
  title: 'Функции и процедуры в Python',
  layout: 'single',

  sections: [
    {
      heading: 'Зачем нужны функции',
      content: `
<p>Функция — именованный блок кода, который можно вызывать в любом месте программы. Функции избавляют от копирования кода и разбивают программу на логические части.</p>
<pre><code class="language-python">def имя_функции(параметр1, параметр2):
    """Описание что делает функция."""
    # тело функции
    return результат    # необязательно</code></pre>
<pre><code class="language-python">def kvadrat(x):
    return x ** 2

print(kvadrat(5))   # 25
print(kvadrat(10))  # 100</code></pre>`,
      example: {
        title: 'Несколько математических функций',
        code: `def square(x): return x ** 2
def cube(x):   return x ** 3

def is_even(n):
    return n % 2 == 0

for n in range(1, 6):
    print(f"n={n}: x²={square(n)}, x³={cube(n)}, чётное={is_even(n)}")`
      },
      task: {
        xp: 10,
        prompt: 'Напишите функцию <code>power(base, exp)</code>, которая вычисляет <code>base</code> в степени <code>exp</code> с помощью цикла (без <code>**</code>). Вызовите <code>power(2, 10)</code>. Ожидаемый ответ: <em>1024</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def power(base, exp):\n    result = 1\n    for _ in range(exp):\n        result *= base\n    return result\nprint(power(2, 10))`,
        hint: 'Внутри функции: <code>result = 1</code>, цикл <code>for _ in range(exp)</code>, <code>result *= base</code>.',
        test: (out, code) => out.trim() === '1024' && code.includes('def power') && code.includes('power(')
      }
    },

    {
      heading: 'Параметры и return',
      content: `
<p>Функция может принимать несколько параметров и возвращать несколько значений. Параметры со значением по умолчанию необязательны при вызове:</p>
<pre><code class="language-python">def step(base, exp=2):   # exp=2 по умолчанию
    return base ** exp

print(step(3))     # 9  (exp=2 по умолчанию)
print(step(3, 3))  # 27 (exp=3)</code></pre>
<pre><code class="language-python">def min_max(lst):
    return min(lst), max(lst)   # вернуть два значения

mn, mx = min_max([3, 1, 7, 2])
print(mn, mx)   # 1  7</code></pre>`,
      example: {
        title: 'Функция для таблицы умножения',
        code: `def tablitsa(n, do=10):
    for i in range(1, do+1):
        print(f"{n} × {i} = {n*i}")

tablitsa(7)        # таблица на 7 до 10
print()
tablitsa(5, do=5)  # таблица на 5 до 5`
      },
      task: {
        xp: 10,
        prompt: 'Напишите функцию <code>is_palindrome(s)</code>, которая возвращает <code>True</code> если строка является палиндромом. Проверьте <code>"радар"</code>. Ожидаемый ответ: <em>True</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def is_palindrome(s):\n    return s == s[::-1]\nprint(is_palindrome("радар"))`,
        hint: 'Обратная строка: <code>s[::-1]</code>. Сравни строку с её обратной копией.',
        test: (out, code) => out.trim() === 'True' && code.includes('def is_palindrome') && code.includes('is_palindrome(')
      }
    },

    {
      heading: 'Область видимости',
      content: `
<p>Переменные внутри функции — <strong>локальные</strong>, они не видны снаружи. Переменные вне функции — <strong>глобальные</strong>:</p>
<pre><code class="language-python">x = 10  # глобальная

def foo():
    x = 99  # локальная, не влияет на глобальную
    print(x)  # 99

foo()
print(x)  # 10 — глобальная не изменилась</code></pre>`,
      example: {
        title: 'Рекурсия — функция вызывает себя',
        code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # вызов самой себя

for i in range(1, 8):
    print(f"{i}! = {factorial(i)}")`
      },
      task: {
        xp: 15,
        prompt: 'Напишите функцию <code>count_vowels(s)</code>, которая подсчитывает гласные буквы (а е ё и о у ы э ю я). Проверьте на <code>"Программирование"</code>. Ожидаемый ответ: <em>7</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def count_vowels(s):\n    glasnye = "аеёиоуыэюяАЕЁИОУЫЭЮЯ"\n    count = 0\n    for ch in s:\n        if ch in glasnye:\n            count += 1\n    return count\nprint(count_vowels("Программирование"))`,
        hint: 'Создай строку <code>glasnye</code> со всеми гласными. Для каждого символа: <code>if ch in glasnye</code>.',
        test: (out, code) => out.trim() === '7' && code.includes('def count_vowels') && code.includes('count_vowels(')
      }
    },

    {
      heading: 'Практика: максимум трёх чисел',
      content: `<p>Функция, которая принимает аргументы и возвращает результат — основа программирования.</p>`,
      task: {
        xp: 20,
        practice: true,
        prompt: 'Напишите функцию <code>max3(a, b, c)</code>, которая возвращает наибольшее из трёх чисел (без <code>max()</code>). Проверьте на <code>max3(8, 3, 11)</code>. Ожидаемый ответ: <em>11</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def max3(a, b, c):\n    m = a\n    if b > m:\n        m = b\n    if c > m:\n        m = c\n    return m\nprint(max3(8, 3, 11))`,
        hint: 'Начни с <code>m = a</code>. Если <code>b > m</code> — обнови m. Если <code>c > m</code> — снова обнови.',
        test: (out, code) => out.trim() === '11' && code.includes('def max3') && code.includes('max3(')
      }
    },

    {
      heading: 'Практика: сумма цифр',
      content: `<p>Функция + алгоритм работы с числами.</p>`,
      task: {
        xp: 25,
        practice: true,
        prompt: 'Напишите функцию <code>summa_cifr(n)</code>, которая вычисляет сумму цифр числа. Проверьте на <code>summa_cifr(12345)</code>. Ожидаемый ответ: <em>15</em>.',
        starterCode: `# ваш код здесь
`,
        solution: `def summa_cifr(n):\n    s = 0\n    while n > 0:\n        s += n % 10\n        n //= 10\n    return s\nprint(summa_cifr(12345))`,
        hint: '<code>n % 10</code> — последняя цифра, <code>n //= 10</code> — убирает её. Повторяй пока n > 0.',
        test: (out, code) => out.trim() === '15' && code.includes('def summa_cifr') && code.includes('summa_cifr(')
      }
    }
  ]
};
