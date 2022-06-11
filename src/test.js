<div className="list-group">
  <ul>
    <li>
      <a href="#">
        Tipuri <i className="fas fa-caret-down"></i>
      </a>
      {categories.map((type) => (
        <div className="dropdown_menu">
          <ul>
            <li>
              <a href="#">{type[0]}</a>
            </li>
            <li className="dropdown_submenu">
              <a href="#">
                Specializare <i className="fas fa-caret-right"></i>
                <div className="submenu">
                  <ul>
                    <li>
                      <a href="#">EA</a>
                    </li>
                    <li>
                      <a href="#">TST</a>
                    </li>
                    <li>
                      <a href="#">MON</a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
            <li className="dropdown_submenu">
              <a href="#">
                Grupa <i className="fas fa-caret-right"></i>
                <div className="submenu">
                  <ul>
                    <li>
                      <a href="#">5101</a>
                    </li>
                    <li>
                      <a href="#">5102</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                    <li>
                      <a href="#">5103</a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
          </ul>
        </div>
      ))}
    </li>
  </ul>
</div>;
