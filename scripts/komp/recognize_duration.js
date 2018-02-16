/*

Autogenerating Music Exercises for education program "Muusika Kompositsiooniõpetus" https://et.wikibooks.org/wiki/Muusika_kompositsiooni%C3%B5petus/N%C3%84IDISKURSUS._G%C3%9CMNAASIUM
Commissioned by Estonian Ministry of Education and Research, Tallinn University,  in the frame of Digital Learning Resources project DigiÕppeVaramu https://htk.tlu.ee/oppevara/


Copyright 2018, by Tarmo Johannes trmjhnns@gmail.com

License: MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


// Original exercise:  1.2.1 "Helivältus. Kirjuta helivältus noodikirja märgina. Antud on helivältuse (noot või paus) nimetus. Kirjuta helivältus noodikirja märgina. (Column + MusGen)"
// since writing is difficult, display a choice of notation marks and let to pick the righ one

function recognizeDuration(containerNode, canvasClassName) {
	// variables
	var selectedIndex = -1;
	var clickedImage = "";
	var indexArray = []; // indexes of images to show, one of them correct, to be shuffled
	var durationsToShow = 4;
	var answered = false;

	this.containerNode = containerNode===undefined ? document.body : containerNode;
	this.canvasClassName = canvasClassName === undefined ? "mainCanvas" : canvasClassName;

  // XXX This variable is no longer needed as images are being added as base64 encoded data
	//var folder = "./img";
	var durationImages = [
		{
			src:"1.png",
			name:"täisnoot",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMgAAABjCAYAAADeg0+zAAAACXBIWXMAABE5AAAROQEb2ZNGAAAD10lEQVR4nO3dTYgcRRTA8f9kOsGYGEXxYxUjCpogiggRv6LiIZKDaA56VgPJ3UDQi+DBk3jz4FHQi6AiEg96Sg4eggjRIIgfaDQIIYmoa8hudp0dD28W1804Xd09M9WL/x80C7u19d4s87a6uqtrOsBuYD2SVptflzsDqc0sEGmEAvhz8FXSv13InYAkSZIkSZIkSZIkSZIkSZIkSZIkSZKUWQe4NHcSUkv1C2An7oslDTNfEFv/uP2PdLF1FoY0QgGcBrq5E5FaaDF3ApIkSZIkSZIkSZIy6ORO4H+uC1wFXE6sqi6AHjAH/AGcBf7Klp0skCnqArcD9wP3AHcAtwAbicLoEotGlwbHIjAPnACOA0eBT4FvgP50U5cm527gNeA74jPv+iuOX4FjwOfASaIw+iOOOeBL4AXg+mm+CGncHgMOc3FR9IlieRq4jBg9CmIk2Q68BPww5HdWH7PA61goWmNuBj4i5g7D3thfAFeX9LEJeBlY+I8+Vh5ngH14uqw1YA9x2jTqFGl7hf6eIuYhZUXSA94mRiGplfZS/h//zRr97ivpc/lYAj7BIlEL7SLtdOjxmv2/m9D3cpG8g6dbapHNwM+kvYFvqBljK3A+McYSsL9mHGnsniftjdun2eYYb1SIc4YoXDXUAWaIy4yq50PiXkeKm6h/k+8u4FCF9geA92rG0kABbCOux6u6LnBnhfaPAL83iHcKuC6x7ZPA9w1iCffDamp5/VSqmYbxvqrQtuxeixJYIM3MEfcgUt3aMN6JCm3dsmYMCmIYduvR+o4BOxLbbqPaKLDa1gptP2sYSxqL/aRfXZoDrmgQa09inCXgvgZxpLHZwD9L0FOOgw1iPZcY4+MGMaSxe4C0NVN9Yq1W3cn6qwn9nyUWTEqt8iwxMU4pksPAJTViHC/pdxZ4uMFrkCbqGWKekVIkh4AtFfreVdLfSZx3aA3YCXxL+dOBfWJEuJfyxYXXDvoc1sci8D7pNxCl7LYArwC/UV4kC8QK3EeJG48ri2Uj8ATxBOKwwjgK7J74q5EmZAZ4kRgpUk69TgFHgA+IZzt+WvXzHjEJf4soKJe1T5h/4OnoALcBDxG7muwAbiRGiA0MX9HQI55nPw98TYwWR4idTWYnnrEACySnzcSGC9cQNw83ESsaFoBzxOXg08Avg+9JkiRJkiRJkiRJkqahA1yZOwmppXoF8GDuLKSWOue2P9IIFog0QgH8mDsJqaUu5E5AkiRJkiRJkiRJkiRJkiRJkiRJkiRJyqxDfHRwN3ciUgstFMTHf63PnYnUQvNu+yONYIFII/wN91N9DY5hLiYAAAAASUVORK5CYII="
		},
		{
			src:"1r.png",
			name:"täispaus",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMgAAACUCAQAAAB8Ha6ZAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCAoFERV2zswyAAAAuklEQVR42u3cwQ2DMBBFwU1IB/SRGhAd0hr94KQDDhZC/snM3Qf8DBJoRRUAAAAAAAAAAAD8sEctNmEkT1sgCIIAAAAAAAAAAOmy5rLenev2nEt8RR2erXPlWp+UizQGJAjnj4Gkw3N0rpyquUMQRBAEEQRB/lnSm3qruXslAAAAAHAx/8sajM/vgiAIAAAAAAAAABDPXNZgTJ0IgiAAAAAAAAAAQDxzWYMxdSIIggAAAAAAAAAAANznC0a/CFl/I+x7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA4LTEwVDA1OjE3OjIxKzAwOjAwS4jMKgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOC0xMFQwNToxNzoyMSswMDowMDrVdJYAAAAASUVORK5CYII="
		},
		{
			src:"2.png",
			name:"poolnoot",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMcAAABnCAQAAAAeEJ6jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCAgHHRl6QNPwAAADW0lEQVR42u2dTUgUYRjHf6u7fmMKpqWG+VVmlCBYSEWHOiR06+61g96iU7cOkQhJWFRXoUNRQi140YyooCJLEI1MUyIRkkjLXTc1p4O2Me6MheyA7/D/7WlnnsP7PL+d92tmGfA717GwqDejsSkI6RDOBMJj/k7wakHfNmj/XPPThNYGqfS3jjQAQqXqrMQmro55fye4kk4IrCgrkq2JrjorTXSFdEiHkA7pENIhpEM6hHRIh5AO6RDSIR1COqRDSIeQjq1HIDzi7wQ7dvTnQ/tETcyE1gbZ528dGQCEytVZiU1cHYu+zzAFWMKS7K2AnrMS0iEdQjqkQ0iHdAjpENIhHUI6pENIh3QI6ZAOIR3SIaRD2AmEB/2dYEdJfwG0jdYumNDaIHX+1rH6nFX6HnVWQjrE1kbPWQnpkA4hHdIhpEM6hHQI6ZAOIR3SIaRDOoR0SIeQDukQ0iHsBMKv/JDGZMZA7mj2dMZsWiwllazlolh15Ni3qgW4Uva4ENqGa6Mm5BGkwWwRMfro5aPt2HzwS8ZQXnfJXprJBCB9vxnZBE1WsUiYexu8ae89F8g2KiODdQzRyfQ/oyJmjR2vQyaquB3svLh8jsCGHr5TSOrql9zD/W81UfCKfB5huXxWeEYLFQA08GvtaL2K5hVljLioWKCD3bbYT9LhLTv54KgixjWK18VmEpUOL8nkjaOMXqocolvi56XDE245qJih2XFQL2UuHlOn0iWfo6wkyLjLdsfYNNtwX6niJZ/n61REOesSmcId22wrR8VLNo3rZLzjgNtqihu2yEkVL/l02Erc5/qLD9G1TlyXiufFrsjfAj9c+w9mItn0JIwvZ1S8ZJPGUry83bht7ZTyMkHGFCGVL/nLvz/lHXbdpj3FjMNEuFXFSz7l8fKecDwf5JLDNNhiwOybCFuVrPh8yokjLqv1OapVOm+YwMLifsLxQzxwvC4sFjipsnnFZSwsxsiKry7qOM+g61b7D5pUNO8oZhYLi2nC9DJAxFWEhcW4tg29ptmlU0q8BdVp2E1yQ2n9DyEjHDc1vUD4qVkNfpF3s+qr24qcXfOnp5pmApirw7g3hi3yhB7Gba86C1FBPY2UG37xG6hjlQjjzBIlnRyKKPbJWs/YLLI56MOh8TcwdaTfferyvAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0wOFQwNzoyOToyNCswMDowMApyVHgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMDhUMDc6Mjk6MjQrMDA6MDB7L+zEAAAAAElFTkSuQmCC"
		},
		{
			src:"2r.png",
			name:"poolpaus",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMgAAACTCAYAAADLEVaqAAAACXBIWXMAABE5AAAROQEb2ZNGAAABaklEQVR4nO3csUoEMRSG0T8SRBtBbAS3UbQUS9/F1/MVfCtLbURYbLRNteaGnXOaKfM1dxgSJgkAAAAAAAAAAAAAAAAAAAAAAADUa0nOqyNgVT3Jc3UErOqkOgBWZkBgoCf5rI4AAAAAAAAAAAAAAAAAAABgSS3JVXUErKoneayOgFW59gcGDAgM9CTv1REAAAAAAAAAAADA8WrVAUeqJ3n9fc7ykuR74nqbYED+x2mSj9/nLGdJviautwn+B4EBAwIDBgQGDAgMGBAY6El21RFHaObu1Z9d7GIdXE9yXx1xhHrmb6HfxTnIwfnEgoGZJ71bsk/ylrkvoP3EtTajJbmtjgAAAAAAAAAAAAAAAAAAAGBJLclDdQSsqie5qY6AVbkXCwYMCAy0JNfVEQAAAAAAAAAAAAAAAAAAACypJXmqjoBV9SSX1RGwKtf+wIABgYGW5KI6AgAAAAAAAAAAAAAAAAAAAAAAtuEHqGYMn0IkQk8AAAAASUVORK5CYII="
		},
		{
			src:"4.png",
			name:"veerandnoot",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCAoFERV2zswyAAAChUlEQVR42u3av29NYRzH8c8t7SDEz5YISTtIWASJiRAx8C/YbGIy+DPEymYkWEgsrYXEYBERJSWCAY0iEURp0lxDW0njR3tPctr7nLxeJ+lwm5v0ed73uaf35psAAAAAAAAAAAAAAAAAAAAAAADLq5UkGcqQrVh233M/WTmbpcd+LLue3z8a7XyuZENhVRptfTZlhePXPcbSzjYnBEEEQRBBEEQQBEEQQRBEEAQRBEEEQRAEEQRBSrcySStHGrzCVUkO5EMBf+loJuYG5Xoa/z5Qwgpb3rLcQ8CgHIIIgiCCIAiCCIIggiCIIAgiCIIIgiAIIgiCNIJBue5hUK7LGJRzDwGDcggiCIIIgiAIIgiCCIIggiCIIAgiiC0QBEEEQZBmMCjXPQzKdZnW3AlphoFsT3/WZjqTeZNn+VHuW1bp9uRw9mXrvMem8yjX8yBtd6Wl1JfTGU37n9dINpY2KFeyYxn7T4yZ62VeCLIUVufygjFmrq+C1G9nniwyx8wlSK3253NHOQSp1e586jBHO4O2rb5PG+86ztHOZhtX12fZWxVytNNv6+pxslKObw36PqKrrMjzSkHulrTIkr5WPJEdlZ5322u5HjcqnY+fbun16M2XSkEu2bp6DFbK8TEDZS2znHvIukrPOpMJr+V67KpwPs7Ztjr/6Z3sMMdVIxz1Gukox0UfB+t2fNExpnLWdi2FC4vK8TB7bdVS3UeuLRBjPGfTW/ISWylrUK6V4zmVNX/93avczHCmim1R6KDccO7kYA5lKFvSStLOeF7nae7lbXFr+fNwzJ6Qo0UuoC99SaYKPhPzPc77sgflmpMCAAAAAAAAAAAAAAAAAAAAAAAAgAb4BSQt97vtgwvQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA4LTEwVDA1OjE3OjIxKzAwOjAwS4jMKgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOC0xMFQwNToxNzoyMSswMDowMDrVdJYAAAAASUVORK5CYII="
    },
		{
			src:"4r.png",
			name:"veerandpaus",
			data:"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"
		},
		{
			src:"8.png",
			name:"kaheksandiknoot",
			data:"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"
		},
		{
			src:"8r.png",
			name:"kaheksandikpaus",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMcAAABnCAQAAAAeEJ6jAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCAkRBjVBucwuAAAC2klEQVR42u3cS0hUURzH8e/Vi2EkA5GUUmEFQdEDkojAoAdBhoi0q02bBGnnom1k+1YthXYt2jaUWhk9CQpJodfCRS+DTHuNMzGOM/8WM8j4mGpzmXNuv8/d3TmLub//vf97zp2rICLigSA5rhDcEbJFIbijRhG4dXXMKAQRERERERERERERERERERGpliD5SiG4I2SbQnCH3rNy7OqY9fWr5wgJVEEHHGWAFDlyfOAS6xRI9TRwmxQ2v2VJc1qxVEc9L/hVVozilubsMmPvMM551ii06PSTWVIMw8iwc9HIFgoYxkWFFpWNy1wZxW2OwUVjr5Q+2aDYotJLukI5jCwNZSObyGIY01p3RGc/Kyt+ll2woO2jDoDrOoejM1zx2jC+c2x+XCf50t7dCi06V/9QjhR7SqO6+FnaN6l1YpS6F6w4Ft87NtFKD/fK9vUrsig1VpjmLt2Kk9wTiixafcz8QzHeUsCYJaHAop4JDv2lIFP0cgbDuKu4ohdymQy5ZZeCw/SQAK5hGOf8Ozg/Zx5b6aaDzYQU+MY7PjLGc54wCUAtk6wGdvBSZ2/1HcAw3vvZi+OnHYAbOi/dMIphdCoIFzRRWPJAUc2qao4TAPdJ+fjlg+RovKpxoWUkAac+nfzi5yw+Vs8887wpTq6aaVazqrrXpIG1rPf2oUOsjADQqgmNI8YwjA4F4dIkd5WvBxCvZtVOADzw9x8KxqscxV/LB9QmXFDLNIaxXVG4oM3fJ7lxbFbFVnVT56Uriw7D6FIQLmgk7//rCvFpVu3UAI/5oXK4c+cYVJtwY5I7hWHsUhQu2IdhTPj+Tm5cmtURAIYwlcMFhwG4pTbhghVkMPI0KgoXHMIwnvl/IDUxKYdalUMeYRgHFYQL6vnMVyZKf5zptSD5VPV0R8hehaBbuagcHjSrpjqFICIiIiIiIiIiIiIiIiIi/5Ug+VAhuCOkTSG4Qy/2qBxSyW/KKDy4VPfeOQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wOC0wOVQxNzowNjo1MyswMDowMF8Q8UQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDgtMDlUMTc6MDY6NTMrMDA6MDAuTUn4AAAAAElFTkSuQmCC"
		},
		{
			src:"16.png",
			name:"kuueteistkümnendiknoot",
			data:"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"
		},
		{
			src:"16r.png",
			name:"kuueteistkümnendikpaus",
			data:"iVBORw0KGgoAAAANSUhEUgAAAMcAAABnCAYAAAC0GVYoAAAABmJLR0QA/wD/AP+gvaeTAAAFgUlEQVR4nO3dX4hUVRzA8e/uDkXW9kfKtdowlHqQzdwEoz9s0B/T8iGEHnYhraiX/j0EPYYvgWD00Gu9REKg1NP0TzIjIlCqXXFB8kFoSUmpbFNX13VsejgzznWc2Z2dnZlzZ/f7gQt3ds49/q7uz3vuueeeA5IkSWqAjmw2eyR2EFIaZYDlsYOQ0qgzdgBSWmWAf2IHoZJcLkcmk4kdhpQKGeBFYD9wDrgATAEHgDeAa+KFJsWzAjgCnAbyFbYzwAmgP1aAUgy9wEngIpUTo7j9B4wD99RQZ0eh/K/AFuDqhkcttcAwoQk1XWIkE+Q3QhNsOq+XHXdXE+KWmmoD4WpQS2IUt9PAyzPUW36M1HayzC4xituBaercWFb2+ybFLjXVH9SXHBeq1NdVoeyTzQtfap4J6kuOPHBthfr2lJWZJCSM1HaOUV9iTJbV0wnsrFBuZ9PPQGqSTwg9ULNNjn3AEuBBYPs05YZadypSYz3A7Hurat0uAje37lSkxvuS0ExqdHLsa+VJzGeOyo1nEDgOnJ9jPc8COxKfv5hjfVIqLAb2EsZQ1XoPMgHsAjYR/nPrJIy/Kn5/X0vPYB7riB2AABgAXgAeAZYVfjZF+KUfIwwdOQiMEJpNZxPHriWM6KVQ/lZCkkgL3tuUrhofxQ1lfvGeo/2tT+zvjhaFlDKLgRylLtzFccOZX7xytLfHKA0T+YnwfogaxORobxsS+19Hi2Kect6qNpXP59m8efOy8fHxLoBt27Yd6+vrm+szEyU4b1WbGhsbY3x8HIDu7m5Wrlx5e+SQ5h2bVW1qZGTk0n5/fz+dnf5TNpp/oxFMTU2Rz8/tOd3o6Oil/dWrV881JCmqdYTBhqcJb/RdAH4H3iM81Z6NLuBfSg//bBqrLXUTHs5Vm5tqkjC26rlZ1Lk2cfxYI4OVWuUqwhQ855h5QOEZ4Pka6z1OePh3EvigoRFLLfIus3tf/BRw5wx13lF2zPYmxC01VQ/hl302LyrlgM9mqPfzsmN6mxC71FSvUt8sI5NUnzx6aVnZalP1qAHsym2eAWBRHcedB/qqfPdp2eeP66hfNTI5mueWOo/LU3mChC3AQ2U/e7/OP0OKagf1TZBwiiuXHBiqUO4EvsmpNrWF6s82ptvOEm7m7wVem6bch607FamxbiAsKVfP1aOWbVPrTkVqvDep7+pRbSvOUDJFSD6pbXUQlhs4w9yS4h3CuoHFz3tbeRJSs3QRepXOUvtKTjngO+AV4LpCPbsS37/VuvAXLns7Wudu4CXCIjMrCC+aXQT+JsxLdRQYJSxQs5/QG1XUBfwF3Fj4vKpQVlrwHqZ01XAUbov4ELA9PJ3Y/ypaFFIKHaB05XgmcixSatxGqQt3ktINuprMZlX6PUWp4+QHQrewWqAjm83+HDsIVbd169blw8PDNwEMDg4eHRoaOjHTMWqMDLAmdhCqLJfLcfjw4UufBwYGevHlppaxWZVihw4dYmJiAoCenh56e82LVjI5Uiw5cduaNV7gpaSDlLpwN0aORUoNu3Ajs1mVXuuxCzcqkyO9ksuZufaGVNDF5W8RVpuNRFpwHIWbAjar0skVYqUqfsFRuNIVluBECqlgsyp9NlDqwv2RsEiNIjA50mddYt/7DamgizDhQvF+Y1XccKT0uJ9SYhzD2WGislmVLo8n9ncTkkSRmBzp8kRi/9toUUgps4gw+rY4J+7SuOFI6bGe0v2GsxmmgM2q9Hg0sb8nWhRSCo3gW3/SFa4nTBR9EvgT6I4bjsB5q1Inl8t1ZDIZu3BTwHmrUiaTycQOQQXekEtVmBySJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGne68hms9/EDkJKowyXrwkhqcCpeaQqTA6piv8Bmhdi3c8TF/wAAAAASUVORK5CYII="
		}

	];

	// Create or set necessary HTML elements
	this.containerNode.getElementsByClassName("exerciseTitle")[0].innerHTML = "Leia helivältus";
	this.containerNode.getElementsByClassName("description")[0].innerHTML = "Antud on helivältus, vali milline noodikirja märk sellele vastab.";
	this.containerNode.getElementsByClassName("question")[0].innerHTML =	"Leia õige vältus (klõpsa pildil)";

	var exercise = new MusicExercise(this.containerNode,this.canvasClassName, 0); // no music, no player

	// create table in the response area
	var oldResponse = this.containerNode.getElementsByClassName("response")[0];
	var response = document.createElement("div");
	response.className = "response";
	response.style.width = "100%";
	response.style.maximumWidth = "500px";
	response.innerHTML ='<table> <tr class="tableRow"> </tr></table> ';
	if (oldResponse === null || oldResponse === undefined) {
		//console.log("Creating new response element");
		this.containerNode.getElementsByClassName("responseDiv")[0]. appendChild(response)
	} else {
		//console.log("Replacing response element");
		this.containerNode.getElementsByClassName("responseDiv")[0].replaceChild(response, oldResponse);
	}

	exercise.generate = function() {
		answered = false; // necessary to set a flag to check if the quetion has answered already in checkResponse

		var tryThis = Math.floor(Math.random() * durationImages.length );
		while (selectedIndex === tryThis) { // avoid the same duration twice in a row
			selectedIndex = Math.floor(Math.random() * durationImages.length );
		}
		selectedIndex = tryThis;
		//console.log("Selected ", durationImages[selectedIndex].name);
		this.containerNode.getElementsByClassName("question")[0].innerHTML =	"Milline neist on: <b>" + durationImages[selectedIndex].name + "</b> (Klõpsa noodijoonestikul)";

		indexArray = [];  // make array of pictures to show
		indexArray.push(selectedIndex);
		for (var i=0; i<durationsToShow-1; i++) {
			var index = Math.floor(Math.random() * durationImages.length);
			while (indexArray.indexOf(index)>=0) {
				index = Math.floor(Math.random() * durationImages.length); // avoid repeating elements
			}
			indexArray.push(index);
		}

		// shuffle
		var j, x, k;
		for (k = indexArray.length - 1; k > 0; k--) {
			j = Math.floor(Math.random() * (k + 1));
			x = indexArray[k];
			indexArray[k] = indexArray[j];
			indexArray[j] = x;
		}

	}

	exercise.draw = function() {
		var tableRow = this.containerNode.getElementsByClassName("tableRow")[0];
		tableRow.innerHTML = ""; // remove previous elements
		var tempTable = durationImages.slice(); // temporary table to remove used items from
		for (var i=0; i<durationsToShow; i++) {
			var index = indexArray[i];//Math.floor(Math.random()*tempTable.length);
			var cell = document.createElement("td");
			cell.style.width = "25%"; // TODO: dependante on durationsToShow
			var image = document.createElement("img");
			image.style.width = "80%";
			//image.src = folder + "/" + durationImages[index].src;
			// XXX Logic changes to base64 encoded data
			image.src = "data:image/png;base64," + durationImages[index].data;
			image.className = durationImages[index].name; // pass the value for response function
			image.onclick = function () { // NB jshint: Functions declared within loops referencing an outer scoped variable may lead to confusing semantics.
				clickedDuration = this.className;
				exercise.responseFunction();
			}
			cell.appendChild(image);
			tableRow.appendChild(cell);
		}
	}

	exercise.renew = function() {
		exercise.generate();
		exercise.draw();
		answered = false;

	};

	exercise.renew();

	exercise.responseFunction = function() {
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		}

		exercise.attempts += 1;
		var feedback = "";

		var clickedImage = this.containerNode.getElementsByClassName(clickedDuration)[0];
		if (clickedDuration === durationImages[selectedIndex].name) {
			feedback = "<b>Õige</b>";
			exercise.score +=1;
			if (clickedImage) {
				clickedImage.style.border = "4px solid green";
			}

		} else {
			feedback = "<b>Vale!</b> see on hoopis " +clickedDuration;
			if (clickedImage) {
				clickedImage.style.border = "4px solid red";
				this.containerNode.getElementsByClassName(durationImages[selectedIndex].name)[0].style.border = "4px solid blue";
			}
		}

		this.containerNode.getElementsByClassName("attempts")[0].innerHTML = exercise.attempts;
		this.containerNode.getElementsByClassName("score")[0].innerHTML = exercise.score;
		this.containerNode.getElementsByClassName("feedback")[0].innerHTML = feedback;
		answered = true;

		if (this.testIsRunning() ) {
			// add info to test report			
			exercise.testReport +=  exercise.currentQuestion.toString() +  '. Küsitud noodikirjamärk: ' + durationImages[selectedIndex].name   
			+ '. Sisestatud: ' + clickedDuration;
			exercise.testReport += ".<br>Tagasiside: " + feedback + "<br>";	
			this.nextQuestion(); // this also stops the countdown
		}
	}

	exercise.checkResponse = function() { // nothing here, real check in checkResponse()
		if (answered) {
			alert('Sa oled juba vastanud. Vajuta "Uuenda"');
			return;
		} else {
			alert("Klõpsa õigele noodikrjamärgile.");
		}
	}

	return exercise;

}
