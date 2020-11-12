let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://aif-s3.aif.ru/images/018/624/ded4f53e7867f09b37f3f4d8d0c0a327.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://www.gastronom.ru/binfiles/images/20141003/b3c0313e.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://b1.m24.ru/c/1354666.580xp.jpg'}
]

/*
* Динамически на основе массива вывести список карточек
* Показать цену в модалке (и это должна быть 1 модалка)
* Модалка для удаления с 2мя кнопками
* --------
* на основе $.modal нужно сделать другой плагин $.confirm (Promise)
*
 */


toHTML = fruit => `
        <div class="col">
            <div class="card">
                <img style="height: 300px" src=${fruit.img} class="card-img-top" alt=${fruit.title}>
                    <div class="card-body">
                        <h5 class="card-title">${fruit.title}</h5>
                        <a class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                        <a data-btn="remove" class="btn btn-danger" data-id="${fruit.id}">Удалить</a>
                    </div>
            </div>
        </div>
`

function renderItems() {
    document.querySelector('#fruits').innerHTML = ''
    const html = fruits.map(toHTML).join('')

    document.querySelector('#fruits').innerHTML = html
}

renderItems()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(
            `<p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>`)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `
            <p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>
            `
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            renderItems()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})



