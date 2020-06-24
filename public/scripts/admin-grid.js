var rIndex,
        table = document.getElementById("table");

            // check the empty input
            function checkEmptyInput()
            {
                var isEmpty = false,
                num = document.getElementById("#").value,
                D = document.getElementById("D").value,
                C = document.getElementById("C").value,
                c = document.getElementById("c").value,
                E = document.getElementById("E").value,
                e = document.getElementById("e").value,
                f = document.getElementById("f").value,
                K = document.getElementById("K").value,
                k = document.getElementById("k").value,
                Kpb = document.getElementById("Kpb").value,
                Jsb = document.getElementById("Jsb").value,
                Fya = document.getElementById("Fya").value,
                Fyb = document.getElementById("Fyb").value,
                Jka = document.getElementById("Jka").value,
                Jkb = document.getElementById("Jkb").value,
                Lea = document.getElementById("Lea").value,
                Leb = document.getElementById("Leb").value,
                P1 = document.getElementById("P1").value,
                M = document.getElementById("M").value,
                N = document.getElementById("N").value,
                S = document.getElementById("S").value,
                s = document.getElementById("s").value,
                Lub = document.getElementById("Lub").value,
                Xga = document.getElementById("Xga").value,
                IS = document.getElementById("IS").value,
                ThirtySeven = document.getElementById("37").value,
                AHG = document.getElementById("AHG").value,
                CC = document.getElementById("CC").value;

                return isEmpty;
            }
            
            // add Row
            function addHtmlTableRow()
            {
                // get the table by id
                // create a new row and cells
                // get value from input text
                // set the values into row cell's
                if(!checkEmptyInput()){
                    var newRow = table.insertRow(table.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1),
                    cell3 = newRow.insertCell(2),
                    cell4 = newRow.insertCell(3),
                    cell5 = newRow.insertCell(4),
                    cell6 = newRow.insertCell(5),
                    cell7 = newRow.insertCell(6),
                    cell8 = newRow.insertCell(7),
                    cell9 = newRow.insertCell(8),
                    cell10 = newRow.insertCell(9),
                    cell11 = newRow.insertCell(10),
                    cell12 = newRow.insertCell(11),
                    cell13 = newRow.insertCell(12),
                    cell14 = newRow.insertCell(13),
                    cell15 = newRow.insertCell(14),
                    cell16 = newRow.insertCell(15),
                    cell17 = newRow.insertCell(16),
                    cell18 = newRow.insertCell(17),
                    cell19 = newRow.insertCell(18),
                    cell20 = newRow.insertCell(19),
                    cell21 = newRow.insertCell(20),
                    cell22 = newRow.insertCell(21),
                    cell23 = newRow.insertCell(22),
                    cell24 = newRow.insertCell(23),
                    cell25 = newRow.insertCell(24),
                    cell26 = newRow.insertCell(25),
                    cell27 = newRow.insertCell(26),
                    cell28 = newRow.insertCell(27),

                    num = document.getElementById("#").value,
                    D = document.getElementById("D").value,
                    C = document.getElementById("C").value,
                    c = document.getElementById("c").value,
                    E = document.getElementById("E").value,
                    e = document.getElementById("e").value,
                    f = document.getElementById("f").value,
                    K = document.getElementById("K").value,
                    k = document.getElementById("k").value,
                    Kpb = document.getElementById("Kpb").value,
                    Jsb = document.getElementById("Jsb").value,
                    Fya = document.getElementById("Fya").value,
                    Fyb = document.getElementById("Fyb").value,
                    Jka = document.getElementById("Jka").value,
                    Jkb = document.getElementById("Jkb").value,
                    Lea = document.getElementById("Lea").value,
                    Leb = document.getElementById("Leb").value,
                    P1 = document.getElementById("P1").value,
                    M = document.getElementById("M").value,
                    N = document.getElementById("N").value,
                    S = document.getElementById("S").value,
                    s = document.getElementById("s").value,
                    Lub = document.getElementById("Lub").value,
                    Xga = document.getElementById("Xga").value,
                    IS = document.getElementById("IS").value,
                    ThirtySeven = document.getElementById("37").value,
                    AHG = document.getElementById("AHG").value,
                    CC = document.getElementById("CC").value;

                    cell1.innerHTML = num;
                    cell2.innerHTML = D;
                    cell3.innerHTML = C;
                    cell4.innerHTML = c;
                    cell5.innerHTML = E;
                    cell6.innerHTML = e;
                    cell7.innerHTML = f;
                    cell8.innerHTML = K;
                    cell9.innerHTML = k;
                    cell10.innerHTML = Kpb;
                    cell11.innerHTML = Jsb;
                    cell12.innerHTML = Fya;
                    cell13.innerHTML = Fyb;
                    cell14.innerHTML = Jka;
                    cell15.innerHTML = Jkb;
                    cell16.innerHTML = Lea;
                    cell17.innerHTML = Leb;
                    cell18.innerHTML = P1;
                    cell19.innerHTML = M;
                    cell20.innerHTML = N;
                    cell21.innerHTML = S;
                    cell22.innerHTML = s;
                    cell23.innerHTML = Lub;
                    cell24.innerHTML = Xga;
                    cell25.innerHTML = IS;
                    cell26.innerHTML = ThirtySeven;
                    cell27.innerHTML = AHG;
                    cell28.innerHTML = CC;

                // call the function to set the event to the new row
                selectedRowToInput();
            }
        }

            // display selected row data into input text
            function selectedRowToInput()
            {

                for(var i = 1; i < table.rows.length; i++)
                {
                    table.rows[i].onclick = function()
                    {
                      // get the seected row index
                      rIndex = this.rowIndex;

                      document.getElementById("#").value = this.cells[0].innerHTML;
                      document.getElementById("D").value = this.cells[1].innerHTML;
                      document.getElementById("C").value = this.cells[2].innerHTML;
                      document.getElementById("c").value = this.cells[3].innerHTML;
                      document.getElementById("E").value = this.cells[4].innerHTML;
                      document.getElementById("e").value = this.cells[5].innerHTML;
                      document.getElementById("f").value = this.cells[6].innerHTML;
                      document.getElementById("K").value = this.cells[7].innerHTML;
                      document.getElementById("k").value = this.cells[8].innerHTML;
                      document.getElementById("Kpb").value = this.cells[9].innerHTML;
                      document.getElementById("Jsb").value = this.cells[10].innerHTML;
                      document.getElementById("Fya").value = this.cells[11].innerHTML;
                      document.getElementById("Fyb").value = this.cells[12].innerHTML;
                      document.getElementById("Jka").value = this.cells[13].innerHTML;
                      document.getElementById("Jkb").value = this.cells[14].innerHTML;
                      document.getElementById("Lea").value = this.cells[15].innerHTML;
                      document.getElementById("Leb").value = this.cells[16].innerHTML;
                      document.getElementById("P1").value = this.cells[17].innerHTML;
                      document.getElementById("M").value = this.cells[18].innerHTML;
                      document.getElementById("N").value = this.cells[19].innerHTML;
                      document.getElementById("S").value = this.cells[20].innerHTML;
                      document.getElementById("s").value = this.cells[21].innerHTML;
                      document.getElementById("Lub").value = this.cells[22].innerHTML;
                      document.getElementById("Xga").value = this.cells[23].innerHTML;
                      document.getElementById("IS").value = this.cells[24].innerHTML;
                      document.getElementById("37").value = this.cells[25].innerHTML;
                      document.getElementById("AHG").value = this.cells[26].innerHTML;
                      document.getElementById("CC").value = this.cells[27].innerHTML;

                  };
              }
          }
          selectedRowToInput();

          function editHtmlTbleSelectedRow()
          {
            var num = document.getElementById("#").value,
            D = document.getElementById("D").value,
            C = document.getElementById("C").value,
            c = document.getElementById("c").value,
            E = document.getElementById("E").value,
            e = document.getElementById("e").value,
            f = document.getElementById("f").value,
            K = document.getElementById("K").value,
            k = document.getElementById("k").value,
            Kpb = document.getElementById("Kpb").value,
            Jsb = document.getElementById("Jsb").value,
            Fya = document.getElementById("Fya").value,
            Fyb = document.getElementById("Fyb").value,
            Jka = document.getElementById("Jka").value,
            Jkb = document.getElementById("Jkb").value,
            Lea = document.getElementById("Lea").value,
            Leb = document.getElementById("Leb").value,
            P1 = document.getElementById("P1").value,
            M = document.getElementById("M").value,
            N = document.getElementById("N").value,
            S = document.getElementById("S").value,
            s = document.getElementById("s").value,
            Lub = document.getElementById("Lub").value,
            Xga = document.getElementById("Xga").value,
            IS = document.getElementById("IS").value,
            ThirtySeven = document.getElementById("37").value,
            AHG = document.getElementById("AHG").value,
            CC = document.getElementById("CC").value;

            if(!checkEmptyInput()){
                table.rows[rIndex].cells[0].innerHTML = num;
                table.rows[rIndex].cells[1].innerHTML = D;
                table.rows[rIndex].cells[2].innerHTML = C;
                table.rows[rIndex].cells[3].innerHTML = c;
                table.rows[rIndex].cells[4].innerHTML = E;
                table.rows[rIndex].cells[5].innerHTML = e;
                table.rows[rIndex].cells[6].innerHTML = f;
                table.rows[rIndex].cells[7].innerHTML = K;
                table.rows[rIndex].cells[8].innerHTML = k;
                table.rows[rIndex].cells[9].innerHTML = Kpb;
                table.rows[rIndex].cells[10].innerHTML = Jsb;
                table.rows[rIndex].cells[11].innerHTML = Fya;
                table.rows[rIndex].cells[12].innerHTML = Fyb;
                table.rows[rIndex].cells[13].innerHTML = Jka;
                table.rows[rIndex].cells[14].innerHTML = Jkb;
                table.rows[rIndex].cells[15].innerHTML = Lea;
                table.rows[rIndex].cells[16].innerHTML = Leb;
                table.rows[rIndex].cells[17].innerHTML = P1;
                table.rows[rIndex].cells[18].innerHTML = M;
                table.rows[rIndex].cells[19].innerHTML = N;
                table.rows[rIndex].cells[20].innerHTML = S;
                table.rows[rIndex].cells[21].innerHTML = s;
                table.rows[rIndex].cells[22].innerHTML = Lub;
                table.rows[rIndex].cells[23].innerHTML = Xga;
                table.rows[rIndex].cells[24].innerHTML = IS;
                table.rows[rIndex].cells[25].innerHTML = ThirtySeven;
                table.rows[rIndex].cells[26].innerHTML = AHG;
                table.rows[rIndex].cells[27].innerHTML = CC;
            }
          }

          function removeSelectedRow()
          {
            table.deleteRow(rIndex);
                // clear input text

                num = document.getElementById("#").value = "";
                D = document.getElementById("D").value = "";
                C = document.getElementById("C").value = "";
                c = document.getElementById("c").value = "";
                E = document.getElementById("E").value = "";
                e = document.getElementById("e").value = "";
                f = document.getElementById("f").value = "";
                K = document.getElementById("K").value = "";
                k = document.getElementById("k").value = "";
                Kpb = document.getElementById("Kpb").value = "";
                Jsb = document.getElementById("Jsb").value = "";
                Fya = document.getElementById("Fya").value = "";
                Fyb = document.getElementById("Fyb").value = "";
                Jka = document.getElementById("Jka").value = "";
                Jkb = document.getElementById("Jkb").value = "";
                Lea = document.getElementById("Lea").value = "";
                Leb = document.getElementById("Leb").value = "";
                P1 = document.getElementById("P1").value = "";
                M = document.getElementById("M").value = "";
                N = document.getElementById("N").value = "";
                S = document.getElementById("S").value = "";
                s = document.getElementById("s").value = "";
                Lub = document.getElementById("Lub").value = "";
                Xga = document.getElementById("Xga").value = "";
                IS = document.getElementById("IS").value = "";
                ThirtySeven = document.getElementById("37").value = "";
                AHG = document.getElementById("AHG").value = "";
                CC = document.getElementById("CC").value = "";
            }