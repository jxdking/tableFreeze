# tableFreeze
A simple javascript tool to freeze lines or columns of a normal HTML table.

## Usage
Dependency: **jQuery**. Make sure you have loaded jQuery at front. Then, add following code to your web page to freeze the lines or columns. It always freezes the most top or left line(s)/column(s).
```html
<script src="~/Scripts/tableFreeze.js" type="text/javascript"></script>
<script>
    $(function () {
        tableFreeze(document.getElementById('your-table-id'), { fixedLines: 1, fixedColumns: 1 });
    });
</script>
```
