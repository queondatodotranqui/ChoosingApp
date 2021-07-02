"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChoosingApp = function (_React$Component) {
    _inherits(ChoosingApp, _React$Component);

    function ChoosingApp(props) {
        _classCallCheck(this, ChoosingApp);

        var _this = _possibleConstructorReturn(this, (ChoosingApp.__proto__ || Object.getPrototypeOf(ChoosingApp)).call(this, props));

        _this.state = {
            options: []
        };

        _this.deleteOptions = _this.deleteOptions.bind(_this);
        _this.addOptions = _this.addOptions.bind(_this);
        return _this;
    }

    _createClass(ChoosingApp, [{
        key: "deleteOptions",
        value: function deleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "addOptions",
        value: function addOptions(data) {
            var _this2 = this;

            this.setState(function () {
                var options = _this2.state.options.concat(data);
                return { options: options };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var options = this.state.options;


            return React.createElement(
                "div",
                { className: "container-fluid contenedor" },
                React.createElement(Header, null),
                React.createElement(
                    "div",
                    { className: "box" },
                    React.createElement(Action, {
                        hasOptions: options.length > 0,
                        "delete": this.deleteOptions
                    }),
                    React.createElement(AddOption, { addOptions: this.addOptions }),
                    React.createElement(Options, { data: options })
                )
            );
        }
    }]);

    return ChoosingApp;
}(React.Component);

var Header = function Header() {
    return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
            "h1",
            null,
            "Choosing App"
        )
    );
};

var Action = function (_React$Component2) {
    _inherits(Action, _React$Component2);

    function Action() {
        _classCallCheck(this, Action);

        return _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).apply(this, arguments));
    }

    _createClass(Action, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                { className: "makeD" },
                React.createElement(
                    "button",
                    { onClick: this.handlePick, className: "btn btn-info", disabled: !this.props.hasOptions },
                    "Make decision"
                ),
                React.createElement(
                    "button",
                    { onClick: this.props.delete, className: "btn btn-danger" },
                    "Remove All"
                )
            );
        }
    }]);

    return Action;
}(React.Component);

var Options = function (_React$Component3) {
    _inherits(Options, _React$Component3);

    function Options() {
        _classCallCheck(this, Options);

        return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
    }

    _createClass(Options, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "options" },
                this.props.data && this.props.data.map(function (item) {
                    return React.createElement(Option, { key: item, data: item });
                })
            );
        }
    }]);

    return Options;
}(React.Component);

var Option = function Option(props) {
    return React.createElement(
        "div",
        { className: "option" },
        props.data
    );
};

var AddOption = function AddOption(props) {
    return React.createElement(
        "form",
        { className: "addOption", onSubmit: function onSubmit(e) {
                e.preventDefault();
                var option = e.target.elements.option.value.trim();

                if (option) {
                    props.addOptions(option);
                    e.target.elements.option.value = '';
                }
            } },
        React.createElement(
            "div",
            { className: "form-group d-flex" },
            React.createElement("input", { type: "text", placeholder: "Option...", name: "option", style: { width: '75%' } }),
            React.createElement(
                "button",
                { type: "submit", className: "btn btn-primary", style: { width: '25%' } },
                "Add"
            )
        )
    );
};

ReactDOM.render(React.createElement(ChoosingApp, null), document.getElementById('root'));
