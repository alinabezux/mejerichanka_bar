import fon from "../components/pictures/кальян фон менший.png";
import hookah1 from '../components/pictures/кальян червоний фото.jpg'
import hookah2 from '../components/pictures/кальян + коктейль.jpg'
import hookah3 from '../components/pictures/кальяни.jpg'
import ps from '../components/pictures/ps.jpg'
import fifa from '../components/pictures/fifa.jpg'

const HookahPage = () => {
    return (
        <div className="hookah-page">

            <div className="hook-fon">
                <img src={fon} alt="фон"/>
            </div>

            <div className="hook-content">
                <div className="hook-images">
                    <img src={hookah2} alt="кальян"/>
                    <img src={hookah1} alt="кальян"/>
                    <img src={hookah3} alt="кальян"/>
                </div>
                <div className="hookah-menu">
                    <h2 style={{fontFamily: 'Forum', fontSize: '43px', marginTop: '40px'}}>Кальянна карта</h2>
                    <table>
                        <thead>
                        <tr>
                            <th style={{width: "75%"}}><strong>Табак</strong></th>
                            <th style={{width: "15%"}}><strong>Ціна</strong></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Arawak, 4:20, Aloha, Focus light</td>
                            <td><b><i>300 грн.</i></b></td>
                        </tr>
                        <tr>
                            <td>Daily hookah, Must have, Dark side</td>
                            <td><b><i>300 грн.</i></b></td>
                        </tr>
                        </tbody>
                    </table>

                    <br/>

                    <table>
                        <thead>
                        <tr>
                            <th style={{width: "75%"}}>Фруктові чаші</th>
                            <th style={{width: "15%"}}></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Грейпфрут</td>
                            <td><b><i>+ 100</i></b></td>
                        </tr>
                        <tr>
                            <td>Ананас</td>
                            <td><b><i>+ 250</i></b></td>
                        </tr>
                        <tr>
                            <td>Яблуко</td>
                            <td><b><i>+ 50</i></b></td>
                        </tr>
                        </tbody>
                    </table>

                    <br/>

                    <table style={{marginBottom: '30px'}}>
                        <thead>
                        <tr>
                            <th style={{width: "75%"}}>Добавки</th>
                            <th style={{width: "15%"}}></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Молоко</td>
                            <td><b><i>+ 30</i></b></td>
                        </tr>
                        <tr>
                            <td>Доха | Абсент</td>
                            <td><b><i>+ 100</i></b></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="ps">
                    <img src={ps} alt="ps"/>
                    <img src={fifa} alt="ps2"/>
                    <p>Sony PlayStation 4 - 50 грн/год
                        <br/>
                        Xbox - 40 грн/год
                    </p>
                </div>
            </div>
        </div>
    )
}

export
{
    HookahPage
}