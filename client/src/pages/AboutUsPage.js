import corporativ from '../components/pictures/корпоратив.jpg'
import zadniydvir from '../components/pictures/zadniy dvir.jpg'
import money from '../components/pictures/гроші.png'
import inst from '../components/pictures/inst.jpg'
import basket from '../components/pictures/кошик.png'
import dostavka from '../components/pictures/доставка.png'
import strava from '../components/pictures/страва.png'
import mjrch from '../components/pictures/MEJERICHANKA (2).png'

const AboutUsPage = () => {
    return (
        <div className="about-page">

            <img style={{width: '100%', position: 'center'}} src={mjrch} alt="mjrch"/>

            <div className="wrap">
                <div>
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'Forum'}}>Про нас</h1>
                    <p>Межирічанка - це про ідеальний відпочинок.
                        <br/>
                        Ми позиціонуємо себе, як український ресторан і готуємо страви, що актуальні для сучасного
                        українця, а тому не обмежуємось лише національною кухнею. </p>
                </div>

                <div>
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'Forum'}}>Графік роботи</h1>
                    <p>Будні: 10:00-16:00 <br/>
                        Вихідні: на замовлення</p>
                </div>

                <div id="reserve">
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'Forum'}}>Резервація</h1>
                    <div className="wrap-item">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2546.611076776012!2d24.20277057632659!3d50.33650687157065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4724d8443a8246e1%3A0x8aeca3e461e1f833!2z0JzQtdC20LjRgNGW0YfQsNC90LrQsA!5e0!3m2!1suk!2sua!4v1690191306814!5m2!1suk!2sua"
                            width="600" height="450" allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <p>Зарезервувати столик чи подію можна за телефоном:
                            <br/> <b>+380 96 097 00 68</b> <br/>
                            Ми знаходимось за адресою:
                            <br/>Україна, Львівська обл., Червоноградський р-он,<br/> смт Межиріччя, <br/>
                            вул. Шахтарська, 17</p>
                    </div>
                </div>

                <div>
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'Forum'}}>Бенкети</h1>
                    <div className="wrap-item">
                        <p>Межирічанка пропонує організацію банкетів будь-якого формату для всіх бажаючих: корпоративи,
                            фуршети, дні народження, весілля, дитячі свята.</p>
                        <div>
                            <img src={corporativ} alt="корпоратив"/>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'Forum'}}>Задній двір</h1>
                    <div className="wrap-item">
                        <div>
                            <img src={zadniydvir} alt="zadniy dvir"/>
                        </div>
                        <p>Що може стати хорошою ідеєю для спекотного літнього дня? Звичайно, що освіжаючий
                            коктейль,кальян
                            та ситне мангал-меню 😉 <br/> Не зволікай, а запрошуй улюблену компанію та мерщій до нас!
                        </p>
                    </div>
                </div>

                <div id="delivery">
                    <h1 style={{textAlign: 'center', color: 'white', fontFamily: 'Forum'}}>Доставка</h1>
                    <div className="delivery-info">
                        <div className="delivery-info-item">
                            <img src={basket} alt="basket"/>
                            <p>Обирайте страву та оформляйте замовлення на сайті або зателефонувавши за номером:
                                +380 96 097 00 68. Замовлення приймаються щодня з 10:00 по 16:00.</p>
                        </div>
                        <div className="delivery-info-item">
                            <img src={money} alt="money"/>
                            <p>Оплачуйте замовлення готівкою або карткою при отриманні. При замовленні на суму більше
                                500 грн доставка безкоштовна.
                                В іншому випадку вартість доставки складатиме 60грн.</p>
                        </div>
                        <div className="delivery-info-item">
                            <img src={dostavka} alt="money"/>
                            <p>Оператор озвучить час доставки вашого замовлення. Середній час доставки по місту та
                                околицях складає
                                60хв від моменту вашого замовлення. (За вийнятком окремих позицій у меню)</p>
                        </div>
                        <div className="delivery-info-item">
                            <img src={strava} alt="money"/>
                            <p>Насолоджуйтесь смаком! Бажаємо приємного апетиту!</p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
        ;
}

export {AboutUsPage}