# 🪵 Правила логування в консолі

Послідовне і чисте логування допомагає відлагоджувати і підтримувати код без зайвого шуму.

---

## 📌 Формат логів

```ts
console.log("[ТЕГ] короткий опис", optionalData);
```

---

## ✅ Рівні важливості

| Метод           | Коли використовувати               |
| --------------- | ---------------------------------- |
| `console.log`   | Стандартні дії                     |
| `console.info`  | Інформативні повідомлення          |
| `console.warn`  | Щось пішло не так, але не критично |
| `console.error` | Помилки або фейли                  |

## 🔖 Приклади тегів

| Тег          | Опис                         |
| ------------ | ---------------------------- |
| `[GA EVENT]` | Google Analytics подія       |
| `[API]`      | Виклик API або відповіді     |
| `[DB]`       | Робота з базою даних         |
| `[FORM]`     | Подання або валідація форм   |
| `[AUTH]`     | Логін, реєстрація, перевірка |
| `[ERROR]`    | Помилки                      |

---

## 🧪 Приклади логів

```ts
console.log("[API] fetching /api/tyres");
console.info("[FORM] contact form submitted");
console.warn("[AUTH] token missing");
console.error("[DB] failed to fetch tyre list");

console.log("[GA EVENT] click");
console.log({
  event_category: "brand",
  event_label: "Michelin",
});
```
