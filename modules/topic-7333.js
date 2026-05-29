export default {
  id: 'topic-7333',
  code: '7.3.3.3',
  title: 'Составные условия в Python',

  theory: `
<h2>Логические операторы</h2>
<p>Составное условие объединяет несколько простых условий с помощью логических операторов: <code>and</code> (и), <code>or</code> (или), <code>not</code> (не). Это позволяет заменить вложенные условия более компактной и читаемой записью.</p>

<table>
  <tr><th>Оператор</th><th>Значение</th><th>Результат True, если...</th></tr>
  <tr><td><code>and</code></td><td>логическое И</td><td>оба условия истинны</td></tr>
  <tr><td><code>or</code></td><td>логическое ИЛИ</td><td>хотя бы одно условие истинно</td></tr>
  <tr><td><code>not</code></td><td>логическое НЕ</td><td>условие ложно</td></tr>
</table>

<h2>Таблицы истинности</h2>
<pre><code class="language-python"># AND: истинно, только если ОБА истинны
True and True   # True
True and False  # False
False and True  # False

# OR: истинно, если ХОТЯ БЫ ОДНО истинно
True or False   # True
False or False  # False

# NOT: инвертирует значение
not True   # False
not False  # True</code></pre>

<h2>Приоритет операторов</h2>
<p>Python вычисляет операторы в следующем порядке: сначала <code>not</code>, затем <code>and</code>, затем <code>or</code>. Для управления порядком используйте скобки:</p>
<pre><code class="language-python">x = 5
# Без скобок: (x > 0 and x < 10) or x == 100
# Со скобками для ясности:
if (x > 0 and x < 10) or x == 100:
    print("Условие выполнено")</code></pre>

<div class="tip"><strong>Совет:</strong> в Python допустима сокращённая запись диапазона: <code>0 &lt; x &lt; 10</code> вместо <code>x &gt; 0 and x &lt; 10</code>.</div>
`,

  examples: [
    {
      title: 'Пример 1: Проверка высокосного года',
      code: `god = 2024

# Год високосный, если делится на 4,
# НО не делится на 100,
# КРОМЕ случаев, когда делится на 400
if (god % 4 == 0 and god % 100 != 0) or (god % 400 == 0):
    print(f"{god} — високосный год")
else:
    print(f"{god} — обычный год")`
    },
    {
      title: 'Пример 2: Валидация прямоугольного треугольника',
      code: `a, b, c = 3, 4, 5  # стороны треугольника

# Сначала проверим, что треугольник существует
treugolnik = (a + b > c) and (a + c > b) and (b + c > a)

if treugolnik:
    # Теорема Пифагора: c — гипотенуза (наибольшая сторона)
    gipot = max(a, b, c)
    katet1 = min(a, b, c)
    katet2 = sorted([a, b, c])[1]
    if katet1**2 + katet2**2 == gipot**2:
        print("Прямоугольный треугольник")
    else:
        print("Треугольник существует, но не прямоугольный")
else:
    print("Такой треугольник не существует")`
    }
  ],

  tasks: [
    {
      prompt: 'Дано число <code>n = 15</code>. Проверьте, делится ли оно и на 3, и на 5 одновременно. Выведите <em>«Делится на 3 и на 5»</em> или <em>«Не выполняется»</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `n = 15\nif n % 3 == 0 and n % 5 == 0:\n    print("Делится на 3 и на 5")\nelse:\n    print("Не выполняется")`,
      hint: 'Вам нужно проверить ДВА условия сразу. Напишите два выражения с <code>%</code> и соедините их оператором <code>and</code>: оба должны быть истинными.',
      test: (out, code) => out.trim() === 'Делится на 3 и на 5' && code.includes('if')
    },
    {
      prompt: 'Дана оценка <code>ball = 87</code> и флаг <code>horosho_vedet = True</code> (хорошо ведёт себя на уроках). Выведите <em>«Рекомендован к награде»</em>, если балл не ниже 85 И хорошо ведёт себя; иначе <em>«Не рекомендован»</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `ball = 87\nhorosho_vedet = True\nif ball >= 85 and horosho_vedet:\n    print("Рекомендован к награде")\nelse:\n    print("Не рекомендован")`,
      hint: 'Нужно выполнение обоих условий: <code>ball &gt;= 85</code> и флаг <code>horosho_vedet</code>. Переменная-флаг типа <code>bool</code> может стоять в условии сама по себе, без <code>== True</code>.',
      test: (out, code) => out.trim() === 'Рекомендован к награде' && code.includes('if')
    },
    {
      prompt: 'Дано число <code>x = 7</code>. Выведите <em>«Подходит»</em>, если число входит в диапазон от 5 до 15 (включительно), НО не равно 10. Иначе выведите <em>«Не подходит»</em>.',
      starterCode: `# ваш код здесь
`,
      solution: `x = 7\nif 5 <= x <= 15 and x != 10:\n    print("Подходит")\nelse:\n    print("Не подходит")`,
      hint: 'Python позволяет записывать диапазон компактно: <code>5 &lt;= x &lt;= 15</code>. Добавьте к этому проверку через <code>and</code>, что <code>x</code> не равен исключённому значению.',
      test: (out, code) => out.trim() === 'Подходит' && code.includes('if')
    }
  ]
};
