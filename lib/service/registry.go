package service

var Registry *ServiceRegistry = &ServiceRegistry{Services:map[string]ServiceFactory{}}

// ServiceRegistry provide all services that will be called through the rest api
type ServiceRegistry struct {
	Services map[string]ServiceFactory
}

func (p *ServiceRegistry) Get(name string) interface{} {
	if sf := p.Services[name]; sf != nil {
		return sf.Get()
	} else {
		return nil
	}
}

func (p *ServiceRegistry) Put(name string, factory ServiceFactory) {
	p.Services[name] = factory
}


