/* 
 * Copyright (C) 2019 Timur Akmalov <me at acidwave dot ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$(document).ready(function(){
    var $page=0;
    var $total=0;
    function getOrders(){
        $.get( "api/getOrders.php?page=" + $page, function( data ) {
            $total = Math.floor(data.total / 10);
            $('#data tbody').remove();
            $('#data').append(
                `<tbody>${data.orders.map(n =>
                  `<tr>
                    <td>${n.order_id}</td>
                    <td>${n.fio}</td>
                    <td>${n.phone}</td>
                    <td>${n.email}</td>
                    <td>${n.created}</td>
                    <td>${n.summ}</td>
                  </tr>`).join('')}
                </tbody>`
            );
        }, "json"); 
    }
    getOrders();
    $('#next').on("click" , function(){
        $page++;
        getOrders();
        $('#prev').prop('disabled', false);
        if ($page === $total) {
            $('#next').prop('disabled', true);
        }
    });
    $('#prev').on("click" , function(){
        $page--;
        getOrders();
        $('#next').prop('disabled', false);
        if ($page === 0) {
            $('#prev').prop('disabled', true);
        }
    });
}); 
